#!/usr/bin/env bash
# Demo do estado PENDENTE (deadlock por pinning). Roda numa JVM separada porque
# a carrier presa nunca é liberada — o próprio demo encerra a JVM no final.
cd "$(dirname "$0")/.."
exec java -Djdk.virtualThreadScheduler.parallelism=1 \
          -Djdk.virtualThreadScheduler.maxPoolSize=1 \
          demos/DeadlockPendingDemo.java
