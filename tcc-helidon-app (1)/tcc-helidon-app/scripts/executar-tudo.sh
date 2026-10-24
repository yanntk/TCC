#!/usr/bin/env bash
# UM COMANDO: sobe o Helidon SE, roda toda a bateria, para o servidor (grava o .jfr),
# gera relatorio/index.html (substituindo o anterior) e abre no navegador.
#
#   scripts/executar-tudo.sh                 # Helidon SE (Virtual Threads nativas)
#   DURATION=30 scripts/executar-tudo.sh     # versão rápida
#
# Pré-requisito: PostgreSQL no ar e JMeter 5.x (variável JMETER se não estiver no PATH).
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${HOST:-localhost}"; PORT="${PORT:-8081}"
DESTINO="${DESTINO:-relatorio}"
JAR="target/tcc-helidon-app.jar"
[[ -f "$JAR" ]] || JAR="target/tcc-helidon-app-0.0.1-SNAPSHOT.jar"
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
  echo "   Para o relatório refletir uma gravação JFR nova, pare esse app antes e deixe este script subir o servidor."
else
  if [[ ! -f "$JAR" ]]; then echo ">> compilando (mvn -DskipTests package)..."; mvn -q -DskipTests package; fi
  echo ">> subindo o app Helidon SE (log: app.log)..."
  scripts/iniciar-app.sh >app.log 2>&1 &
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

parar_app
JFR="pinning-helidon.jfr"
if [[ "$INICIOU_APP" == "1" && -f "$JFR" ]]; then
  cp "$JFR" "${DESTINO}/"
  python3 scripts/resumo.py "$DESTINO" --rampup "${RAMPUP:-10}" >/dev/null 2>&1 || true
fi
echo ">> relatório final: ${DESTINO}/index.html"
if command -v xdg-open >/dev/null; then xdg-open "${DESTINO}/index.html" >/dev/null 2>&1 || true; fi
