#!/usr/bin/env bash
# UM COMANDO: sobe o servidor, roda toda a bateria, para o servidor (grava o .jfr),
# gera relatorio/index.html (substituindo o anterior) e abre no navegador.
#
#   scripts/executar-tudo.sh                 # Virtual Threads
#   MODO=platform scripts/executar-tudo.sh   # baseline com threads de plataforma
#   DURATION=30 scripts/executar-tudo.sh     # versão rápida (~5 min em vez de ~9)
#
# Pré-requisito: PostgreSQL no ar (o app não sobe sem ele) e JMeter 5.x (variável JMETER se não estiver no PATH).
set -euo pipefail
cd "$(dirname "$0")/.."

MODO="${MODO:-virtual}"; HOST="${HOST:-localhost}"; PORT="${PORT:-8080}"
DESTINO="${DESTINO:-relatorio}"
JAR="target/tcc-streaming-app-0.0.1-SNAPSHOT.jar"
BASE="http://${HOST}:${PORT}"
APP_PID=""; INICIOU_APP=0

parar_app() {
  if [[ -n "$APP_PID" ]] && kill -0 "$APP_PID" 2>/dev/null; then
    echo ">> parando o app (grava o arquivo .jfr)..."
    kill "$APP_PID" 2>/dev/null || true
    wait "$APP_PID" 2>/dev/null || true
  fi
  APP_PID=""
}
trap parar_app EXIT

if curl -fsS "${BASE}/lab/info" >/dev/null 2>&1; then
  echo ">> já existe um app respondendo em ${BASE}: vou usá-lo (e não vou pará-lo)."
  echo "   Para o relatório refletir o modo '${MODO}', pare esse app antes e deixe este script subir o servidor."
else
  if [[ ! -f "$JAR" ]]; then echo ">> compilando (mvn -DskipTests package)..."; mvn -q -DskipTests package; fi
  echo ">> subindo o app em modo ${MODO} (log: app.log)..."
  scripts/iniciar-app.sh "$MODO" >app.log 2>&1 &
  APP_PID=$!; INICIOU_APP=1
  for _ in $(seq 1 90); do
    curl -fsS "${BASE}/lab/info" >/dev/null 2>&1 && break
    if ! kill -0 "$APP_PID" 2>/dev/null; then
      echo "ERRO: o app encerrou ao subir. Últimas linhas de app.log:"; tail -15 app.log; exit 1
    fi
    sleep 1
  done
  curl -fsS "${BASE}/lab/info" >/dev/null 2>&1 || { echo "ERRO: o app não respondeu em 90s (veja app.log)."; exit 1; }
  echo ">> app no ar."
fi

ABRIR=0 scripts/rodar-testes.sh

# Para o app para que o JFR seja gravado em disco, e junta tudo na mesma pasta
parar_app
JFR="pinning-${MODO}.jfr"
if [[ "$INICIOU_APP" == "1" && -f "$JFR" ]]; then   # só copia se este script gravou o .jfr agora
  cp "$JFR" "${DESTINO}/"
  python3 scripts/resumo.py "$DESTINO" --rampup "${RAMPUP:-10}" >/dev/null   # reinclui o link do .jfr no index.html
fi
echo ">> relatório final: ${DESTINO}/index.html"
if command -v xdg-open >/dev/null; then xdg-open "${DESTINO}/index.html" >/dev/null 2>&1 || true; fi
