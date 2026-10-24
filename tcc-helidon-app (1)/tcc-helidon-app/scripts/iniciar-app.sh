#!/usr/bin/env bash
# Sobe o Helidon SE já empacotado, com JFR gravando eventos de pinning.
#
#   mvn -DskipTests package
#   scripts/iniciar-app.sh          (Helidon SE já usa Virtual Threads nativamente)
#
# Variáveis opcionais:
#   PARALLELISM=1   limita as carrier threads (mais pinning, mais fácil de ver o efeito)
#   JFR_ARQUIVO=nome.jfr
#   TRACE_PINNING=1 imprime o stack trace de cada pinning
set -euo pipefail
cd "$(dirname "$0")/.."

JAR="target/tcc-helidon-app.jar"
[[ -f "$JAR" ]] || JAR="target/tcc-helidon-app-0.0.1-SNAPSHOT.jar"
[[ -f "$JAR" ]] || { echo "JAR não encontrado. Rode: mvn -DskipTests package"; exit 1; }

JFR_ARQ="${JFR_ARQUIVO:-pinning-helidon.jfr}"
OPCOES=(-XX:StartFlightRecording="filename=${JFR_ARQ},settings=profile")
if [[ -n "${PARALLELISM:-}" ]]; then
  OPCOES+=("-Djdk.virtualThreadScheduler.parallelism=${PARALLELISM}"
           "-Djdk.virtualThreadScheduler.maxPoolSize=${MAXPOOL:-$PARALLELISM}")
fi
[[ "${TRACE_PINNING:-}" == "1" ]] && OPCOES+=(-Djdk.tracePinnedThreads=full)

echo ">> Helidon SE (Virtual Threads nativas) opções JVM: ${OPCOES[*]}"
exec java "${OPCOES[@]}" -jar "$JAR"
