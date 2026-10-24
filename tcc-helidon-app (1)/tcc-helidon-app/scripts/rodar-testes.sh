#!/usr/bin/env bash
# Roda a bateria de testes de carga (JMeter CLI) contra o Helidon SE JÁ EM EXECUÇÃO e gera
#   relatorio/index.html   <- página única com tabela, gráficos e links
#   relatorio/<cenario>/   <- painel do JMeter, .jtl e info-fim.json de cada cenário
# A pasta "relatorio/" é SUBSTITUÍDA a cada execução. Se a execução falhar no meio,
# o relatório anterior continua intacto.
#
#   scripts/iniciar-app.sh          # em outro terminal (ou use scripts/executar-tudo.sh)
#   scripts/rodar-testes.sh
#
# Variáveis opcionais (padrão entre parênteses):
#   JMETER (jmeter)  THREADS (200)  RAMPUP (10)  DURATION (60)  MS (100)  ITERACOES (50000)
#   MAXID (10000)  DB_MS (0)  HOST (localhost)  PORT (8081)
#   CENARIOS ("io cpu io-cpu pinning-sync pinning-lock db db-semaforo")
#   DESTINO (relatorio)  ABRIR (1 = abre no navegador)  ARQUIVAR (1 = guarda cópia em resultados/<data>)
set -euo pipefail
cd "$(dirname "$0")/.."

JMETER="${JMETER:-jmeter}"
HOST="${HOST:-localhost}"; PORT="${PORT:-8081}"
THREADS="${THREADS:-200}"; RAMPUP="${RAMPUP:-10}"; DURATION="${DURATION:-60}"
MS="${MS:-100}"; ITERACOES="${ITERACOES:-50000}"; MAXID="${MAXID:-10000}"; DB_MS="${DB_MS:-0}"
CENARIOS="${CENARIOS:-io cpu io-cpu pinning-sync pinning-lock db db-semaforo}"
DESTINO="${DESTINO:-relatorio}"; TMP="${DESTINO}.novo"
ABRIR="${ABRIR:-1}"; ARQUIVAR="${ARQUIVAR:-0}"
BASE="http://${HOST}:${PORT}"
PLANO="jmeter/plano-lab.jmx"

command -v "$JMETER" >/dev/null || { echo "JMeter não encontrado. Defina JMETER=/caminho/bin/jmeter"; exit 1; }
VERSAO="$("$JMETER" -v 2>&1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -1 || true)"
if [[ -z "$VERSAO" || "${VERSAO%%.*}" -lt 5 ]]; then
  echo "ERRO: JMeter ${VERSAO:-de versão desconhecida} em $(command -v "$JMETER")."
  echo "      O plano precisa do JMeter 5.x (o pacote 'apt' é o 2.13, de 2015, e não lê o plano)."
  echo "      Baixe em https://jmeter.apache.org/download_jmeter.cgi e rode:  JMETER=/caminho/apache-jmeter-5.x/bin/jmeter $0"
  exit 1
fi
echo ">> JMeter $VERSAO"
curl -fsS "${BASE}/lab/info" >/dev/null 2>&1 || {
  echo "ERRO: o app NÃO está respondendo em ${BASE}."
  echo "      Suba o servidor antes (scripts/iniciar-app.sh) ou use scripts/executar-tudo.sh, que faz tudo."
  exit 1
}

rm -rf "$TMP"; mkdir -p "$TMP"
trap 'rm -rf "$TMP"' EXIT
trap 'echo; echo ">> interrompido: o relatório anterior (${DESTINO}/) foi mantido."; exit 130' INT TERM

jm() { # jm <cenario> <threads> <rampup> <duration> <jtl> [painel]
  local jtl="$5" log="${5%.jtl}-jmeter-saida.txt"
  local args=(-n -t "$PLANO" -l "$jtl"
    -Jhost="$HOST" -Jport="$PORT" -Jcenario="$1" -Jthreads="$2" -Jrampup="$3" -Jduration="$4"
    -Jms="$MS" -Jiteracoes="$ITERACOES" -Jmaxid="$MAXID")
  [[ -n "${6:-}" ]] && args+=(-e -o "$6")
  "$JMETER" "${args[@]}" >"$log" 2>&1 || true
  if [[ ! -s "$jtl" ]]; then
    echo "ERRO: o JMeter não gerou $jtl (cenário $1)."
    echo "      Saída: $log   |   log do JMeter: jmeter.log"
    tail -5 "$log" || true
    exit 1
  fi
}

# Teto otimista medido com a máquina ociosa (antes de qualquer carga)
curl -fsS "${BASE}/lab/info" > "$TMP/info-inicio.json"
curl -fsS "${BASE}/lab/teto?concorrencia=${THREADS}&latenciaMs=${MS}&iteracoes=${ITERACOES}&dbMs=${DB_MS}" > "$TMP/teto.json"
echo ">> teto otimista calculado"

echo ">> aquecimento do JIT (20s, descartado)..."
for c in io cpu; do jm "$c" 50 5 20 "$TMP/aquecimento-$c.jtl"; done
rm -f "$TMP"/aquecimento-*

TOTAL=$(wc -w <<<"$CENARIOS"); N=0
for c in $CENARIOS; do
  N=$((N+1)); echo ">> [$N/$TOTAL] cenário: $c  (${THREADS} usuários, ${DURATION}s)"
  mkdir -p "$TMP/$c"
  curl -fsS -X POST "${BASE}/lab/reset" >/dev/null
  jm "$c" "$THREADS" "$RAMPUP" "$DURATION" "$TMP/$c/resultado.jtl" "$TMP/$c/painel"
  curl -fsS "${BASE}/lab/info" > "$TMP/$c/info-fim.json"
  sleep 5   # deixa GC e pool de conexões se acalmarem entre cenários
done

python3 scripts/resumo.py "$TMP" --rampup "$RAMPUP" | sed "s#${TMP}#${DESTINO}#g"

# troca atômica: só agora o relatório anterior é substituído
rm -rf "$DESTINO"; mv "$TMP" "$DESTINO"
if [[ "$ARQUIVAR" == "1" ]]; then
  mkdir -p resultados; cp -r "$DESTINO" "resultados/helidon-$(date +%Y%m%d-%H%M%S)"
fi
echo ">> pronto: ${DESTINO}/index.html"
if [[ "$ABRIR" == "1" ]] && command -v xdg-open >/dev/null; then xdg-open "$DESTINO/index.html" >/dev/null 2>&1 || true; fi
