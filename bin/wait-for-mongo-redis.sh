#!/usr/bin/env bash

/wait-for-it.sh -t 0 redis:6379 --strict -- echo "redis is up"
/wait-for-it.sh -t 0 mongodb:27017 --strict -- echo "mongo is up"

exec "$@"