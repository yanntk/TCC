#!/usr/bin/env bash
# Sobe o app já empacotado, no modo escolhido, com JFR gravando eventos de pinning.
#
#   mvn -DskipTests package          (uma vez)
#   scripts/iniciar-app.sh virtual   (Tomcat com Virtual Threads)
#   scripts/iniciar-app.sh platform  (Tomcat com pool de threads de plataforma — baseline)
#
# Variáveis opcionais:
#   PARALLELISM=1   limita as carrier threads (mais pinning, mais fácil de ver o efeito)
#   JFR_ARQUIVO=nome.jfr  nome da gravação (padrão pinning-<modo>.jfr)
#   TRACE_PINNING=1 imprime o stack trace de cada pinning (útil p/ olhar; distorce a medição sob carga)
set -euo pipefail
cd "$(dirname "$0")/.."

MODO="${1:-virtual}"
case "$MODO" in
  virtual)  VT=true ;;
  platform) VT=false ;;
  *) echo "uso: $0 [virtual|platform]"; exit 1 ;;
esac

JAR="target/tcc-streaming-app-0.0.1-SNAPSHOT.jar"
[[ -f "$JAR" ]] || { echo "JAR não encontrado. Rode: mvn -DskipTests package"; exit 1; }

JFR_ARQ="${JFR_ARQUIVO:-pinning-${MODO}.jfr}"   # use JFR_ARQUIVO=jfr-io.jfr para separar gravações por cenário
OPCOES=(-XX:StartFlightRecording="filename=${JFR_ARQ},settings=profile")
if [[ -n "${PARALLELISM:-}" ]]; then
  OPCOES+=("-Djdk.virtualThreadScheduler.parallelism=${PARALLELISM}"
           "-Djdk.virtualThreadScheduler.maxPoolSize=${MAXPOOL:-$PARALLELISM}")
fi
[[ "${TRACE_PINNING:-}" == "1" ]] && OPCOES+=(-Djdk.tracePinnedThreads=full)

echo ">> modo=${MODO} (spring.threads.virtual.enabled=${VT}) opções JVM: ${OPCOES[*]}"
exec java "${OPCOES[@]}" -jar "$JAR" "--spring.threads.virtual.enabled=${VT}"
