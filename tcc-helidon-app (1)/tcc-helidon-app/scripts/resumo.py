#!/usr/bin/env python3
"""
Lê os .jtl de uma rodada e gera:
  - tabela no terminal
  - resumo.csv   (separador ';', decimal ',', abre direto no LibreOffice/Excel pt-BR)
  - index.html   (página única, sem dependências externas, com gráficos e links p/ os painéis do JMeter)

Uso:  python3 scripts/resumo.py <pasta-da-rodada> [--rampup 10]
Compara a vazão medida com o TETO OTIMISTA de <pasta>/teto.json (GET /lab/teto).
"""
import argparse, csv, html, json, math, sys
from datetime import datetime
from pathlib import Path

TETO_POR_CENARIO = {
    "io": "tetoIoReqPorSeg", "cpu": "tetoCpuReqPorSeg", "io-cpu": "tetoIoMaisCpuReqPorSeg",
    "pinning-sync": "tetoPinningSynchronizedReqPorSeg", "pinning-lock": "tetoIoReqPorSeg",
    "db": "tetoBancoReqPorSeg", "db-semaforo": "tetoBancoReqPorSeg",
}
ORDEM = ["io", "cpu", "io-cpu", "pinning-sync", "pinning-lock", "db", "db-semaforo"]
DESCRICAO = {
    "io": "I/O-bound (Thread.sleep): a Virtual Thread desmonta e libera a carrier",
    "cpu": "CPU-bound (loop aritmético): nada desmonta, limite = nº de CPUs",
    "io-cpu": "I/O seguido de CPU",
    "pinning-sync": "I/O dentro de synchronized: pinning, execução serial",
    "pinning-lock": "Correção: I/O fora do lock (ReentrantLock)",
    "db": "Fluxo real no PostgreSQL, sem controle (pool Hikari de 30)",
    "db-semaforo": "Fluxo real no PostgreSQL, com Semaphore na frente",
}


def pct(ordenado, p):
    if not ordenado:
        return float("nan")
    return ordenado[max(0, min(len(ordenado) - 1, math.ceil(p / 100 * len(ordenado)) - 1))]


def fmt(v, casas=1):
    if v is None or (isinstance(v, float) and math.isnan(v)):
        return "-"
    return f"{v:,.{casas}f}".replace(",", "§").replace(".", ",").replace("§", ".")


def calcular(jtl: Path, rampup_s: float):
    with jtl.open(newline="", encoding="utf-8", errors="replace") as f:
        linhas = list(csv.DictReader(f))
    if not linhas:
        return None
    inicio = min(int(l["timeStamp"]) for l in linhas)
    corte = inicio + int(rampup_s * 1000)
    est = [l for l in linhas if int(l["timeStamp"]) >= corte] or linhas
    tempos = sorted(int(l["elapsed"]) for l in est)
    erros = sum(1 for l in est if l["success"].strip().lower() != "true")
    t0 = min(int(l["timeStamp"]) for l in est)
    t1 = max(int(l["timeStamp"]) + int(l["elapsed"]) for l in est)
    janela = max((t1 - t0) / 1000, 0.001)
    return {"amostras": len(est), "erros": 100 * erros / len(est), "vazao": len(est) / janela,
            "media": sum(tempos) / len(tempos), "p50": pct(tempos, 50), "p95": pct(tempos, 95),
            "p99": pct(tempos, 99), "max": tempos[-1]}


def ler_json(p: Path):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}


def coletar(pasta: Path, rampup: float):
    teto = ler_json(pasta / "teto.json")
    linhas = []
    cenarios = sorted([p.parent.name for p in pasta.glob("*/resultado.jtl")],
                      key=lambda c: ORDEM.index(c) if c in ORDEM else 99)
    for c in cenarios:
        r = calcular(pasta / c / "resultado.jtl", rampup)
        if r is None:
            continue
        tv = teto.get(TETO_POR_CENARIO.get(c, ""))
        r["cenario"], r["teto"] = c, tv
        r["efic"] = 100 * r["vazao"] / tv if tv else None
        p = ler_json(pasta / c / "info-fim.json").get("picoConcorrencia")
        r["pico"] = p or None
        painel = next((d for d in ("painel", "relatorio") if (pasta / c / d / "index.html").exists()), None)
        r["link"] = f"{c}/{painel}/index.html" if painel else None
        linhas.append(r)
    return linhas, teto, ler_json(pasta / "info-inicio.json")


CAB = ["cenario", "amostras", "erros_%", "vazao_req_s", "teto_otimista_req_s", "eficiencia_%",
       "media_ms", "p50_ms", "p95_ms", "p99_ms", "max_ms", "pico_concorrencia"]


CAB_HTML = ["Cenário", "Amostras", "Erros (%)", "Vazão (req/s)", "Teto otimista (req/s)", "Eficiência (%)",
            "Média (ms)", "p50 (ms)", "p95 (ms)", "p99 (ms)", "Máx (ms)", "Pico de concorrência"]


def celulas(r):
    return [r["cenario"], fmt(r["amostras"], 0), fmt(r["erros"], 2), fmt(r["vazao"]), fmt(r["teto"]),
            fmt(r["efic"]), fmt(r["media"]), fmt(r["p50"], 0), fmt(r["p95"], 0), fmt(r["p99"], 0),
            fmt(r["max"], 0), "-" if r["pico"] is None else str(r["pico"])]


def observacoes(linhas, info):
    por = {r["cenario"]: r for r in linhas}
    obs, cpus = [], info.get("cpus")
    for r in linhas:
        if r["erros"] >= 50:
            obs.append(("erro", f"<b>{r['cenario']}</b>: {fmt(r['erros'],0)}% das requisições falharam. "
                                "O servidor estava no ar durante o teste? Os números desse cenário não valem."))
    s, l, i = por.get("pinning-sync"), por.get("pinning-lock"), por.get("io")
    if s and l and s["vazao"] > 0:
        obs.append(("ok", f"<b>Pinning:</b> com o mesmo trabalho, <code>synchronized</code> entregou "
                          f"{fmt(s['vazao'])} req/s contra {fmt(l['vazao'])} req/s do <code>ReentrantLock</code> "
                          f"(<b>{fmt(l['vazao']/s['vazao'],0)}× mais</b>). A latência p95 foi de "
                          f"{fmt(s['p95']/1000,1)} s contra {fmt(l['p95'],0)} ms."))
    if i and s and i.get("pico") and s.get("pico"):
        extra = f" (a máquina tem {cpus} CPUs, ou seja, {cpus} carrier threads)" if cpus else ""
        obs.append(("ok", f"<b>Concorrência dentro do handler:</b> {i['pico']} em <code>io</code> contra "
                          f"{s['pico']} em <code>pinning-sync</code>{extra}. Com pinning, só rodam "
                          "simultaneamente tantas requisições quanto há carriers."))
    c = por.get("cpu")
    if c and c["efic"] is not None and c["efic"] < 60:
        obs.append(("info", f"<b>CPU:</b> eficiência de {fmt(c['efic'],0)}% — esperado, pois o JMeter roda na "
                            "mesma máquina e disputa as mesmas CPUs com o servidor."))
    d, ds = por.get("db"), por.get("db-semaforo")
    if d and ds:
        obs.append(("info", f"<b>Banco:</b> sem controle {fmt(d['vazao'])} req/s (p95 {fmt(d['p95'],0)} ms); "
                            f"com semáforo {fmt(ds['vazao'])} req/s (p95 {fmt(ds['p95'],0)} ms)."))
    return obs


def barras(linhas, campo, titulo, unidade, campo2=None, rotulo2=""):
    maxv = max([r[campo] or 0 for r in linhas] + ([r[campo2] or 0 for r in linhas] if campo2 else []) + [1e-9])
    out = [f"<h3>{html.escape(titulo)}</h3><table class='bars'>"]
    for r in linhas:
        v = r[campo] or 0
        faixa = ""
        if campo2 and r[campo2]:
            faixa += f"<div class='teto' style='width:{100*r[campo2]/maxv:.2f}%' title='{rotulo2}'></div>"
        faixa += f"<div class='v' style='width:{max(100*v/maxv,0.5):.2f}%'></div>"
        out.append(f"<tr><td class='n'>{r['cenario']}</td><td class='t'><div class='track'>{faixa}</div></td>"
                   f"<td class='x'>{fmt(v,1 if v<100 else 0)} {unidade}</td></tr>")
    out.append("</table>")
    return "".join(out)


def gerar_html(pasta, linhas, teto, info, rampup):
    agora = datetime.now().strftime("%d/%m/%Y %H:%M")
    modo = "Virtual Threads" if info.get("threadDaRequisicaoEhVirtual") else "Threads de plataforma"
    amb = (f"Java {info.get('javaVersion','?')} · {info.get('cpus','?')} CPUs · Tomcat com {modo} · "
           f"Hikari {info.get('hikariMaxPool','?')} conexões · {teto.get('concorrencia','?')} usuários simultâneos")
    corpo = []
    corpo.append("<table><thead><tr>" + "".join(f"<th>{h}</th>" for h in CAB_HTML) + "<th>painel</th></tr></thead><tbody>")
    for r in linhas:
        cel = celulas(r)
        cls = " class='ruim'" if r["erros"] >= 50 else ""
        tds = "".join(f"<td{' class=l' if i==0 else ''}>{html.escape(c)}</td>" for i, c in enumerate(cel))
        link = f"<a href='{r['link']}'>abrir</a>" if r["link"] else "-"
        corpo.append(f"<tr{cls}>{tds}<td>{link}</td></tr>")
    corpo.append("</tbody></table>")
    obs = "".join(f"<div class='obs {k}'>{t}</div>" for k, t in observacoes(linhas, info))
    leg = "".join(f"<li><b>{c}</b> — {html.escape(DESCRICAO.get(c,''))}</li>" for c in [r['cenario'] for r in linhas])
    jfrs = sorted(p.name for p in pasta.glob("*.jfr"))
    evidencias = ""
    if jfrs:
        itens = "".join(f"<li><a href='{n}'>{n}</a></li>" for n in jfrs)
        evidencias = ("<h3>Evidências forenses (JFR)</h3><p class='leg'>Abra no JDK Mission Control ou use "
                      "<code>jfr print --events jdk.VirtualThreadPinned arquivo.jfr</code>. "
                      "Cada evento mostra o stack trace do ponto que prendeu a Virtual Thread.</p><ul class='leg'>" + itens + "</ul>")
    return f"""<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relatório — Laboratório de Virtual Threads</title>
<style>
:root{{--bg:#fff;--fg:#1d2433;--mut:#5b6577;--bd:#d9dee8;--v:#2b6cb0;--t:#cbd5e1;--ok:#e8f5ec;--info:#eaf1fb;--er:#fdeaea}}
@media(prefers-color-scheme:dark){{:root{{--bg:#14171f;--fg:#e6e9f0;--mut:#9aa4b8;--bd:#2c3345;--v:#63a4ff;--t:#3a4358;--ok:#16301f;--info:#17263f;--er:#3a1a1a}}}}
body{{font:15px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--fg);max-width:1100px;margin:0 auto;padding:24px}}
h1{{margin:0 0 4px}}h3{{margin:28px 0 8px}}.sub{{color:var(--mut)}}
table{{border-collapse:collapse;width:100%;font-size:13.5px;display:block;overflow-x:auto}}
th,td{{border-bottom:1px solid var(--bd);padding:6px 10px;text-align:right;white-space:nowrap}}
th{{color:var(--mut);font-weight:600}}td.l,th:first-child{{text-align:left;font-weight:600}}
tr.ruim td{{background:var(--er)}}a{{color:var(--v)}}
.bars{{display:table;table-layout:fixed;width:100%}}.bars td{{border:0;padding:3px 6px;text-align:left}}
.bars td.n{{width:120px;font-weight:600}}.bars td.x{{width:150px;color:var(--mut);font-variant-numeric:tabular-nums}}
.track{{position:relative;height:16px}}.track div{{position:absolute;left:0;top:0;height:16px;border-radius:3px}}
.track .teto{{background:var(--t)}}.track .v{{background:var(--v)}}
.obs{{padding:10px 14px;border-radius:8px;margin:8px 0}}.obs.ok{{background:var(--ok)}}.obs.info{{background:var(--info)}}.obs.erro{{background:var(--er)}}
code{{background:var(--info);padding:1px 5px;border-radius:4px}}.leg{{color:var(--mut);font-size:13.5px}}
</style></head><body>
<h1>Laboratório de Virtual Threads</h1>
<div class="sub">Gerado em {agora} · {html.escape(amb)}</div>
<h3>Leituras principais</h3>{obs or "<div class='obs info'>Sem observações automáticas para estes cenários.</div>"}
<h3>Resultados por cenário</h3>{''.join(corpo)}
<p class="leg">Vazão calculada na janela estável (descartados {rampup:g}s de ramp-up). <b>Eficiência</b> = vazão medida ÷ teto otimista
(Lei de Little: concorrência ÷ latência; para CPU: CPUs ÷ tempo do loop). O teto ignora HTTP, GC e escalonamento.</p>
{barras(linhas,'vazao','Vazão medida (barra azul) × teto otimista (barra cinza)','req/s','teto','teto otimista')}
{barras(linhas,'p95','Latência p95','ms')}
{evidencias}
<h3>O que cada cenário faz</h3><ul class="leg">{leg}</ul>
</body></html>"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pasta")
    ap.add_argument("--rampup", type=float, default=10)
    a = ap.parse_args()
    pasta = Path(a.pasta)
    linhas, teto, info = coletar(pasta, a.rampup)
    if not linhas:
        sys.exit(f"Nenhum */resultado.jtl encontrado em {pasta}")

    with (pasta / "resumo.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(CAB)
        w.writerows(celulas(r) for r in linhas)
    (pasta / "index.html").write_text(gerar_html(pasta, linhas, teto, info, a.rampup), encoding="utf-8")

    tab = [celulas(r) for r in linhas]
    larg = [max(len(CAB[i]), *(len(t[i]) for t in tab)) for i in range(len(CAB))]
    ln = lambda v: "  ".join(x.ljust(larg[i]) if i == 0 else x.rjust(larg[i]) for i, x in enumerate(v))
    print("\n" + ln(CAB)); print("  ".join("-" * x for x in larg))
    for t in tab: print(ln(t))
    for r in linhas:
        if r["erros"] >= 50:
            print(f"\n[AVISO] {r['cenario']}: {fmt(r['erros'],0)}% de erros — o servidor estava no ar?")
    print(f"\nrelatório: {pasta/'index.html'}\nresumo:    {pasta/'resumo.csv'}")


if __name__ == "__main__":
    main()
