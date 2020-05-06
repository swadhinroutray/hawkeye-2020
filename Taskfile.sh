#!/bin/bash
default(){
    start
}

start() {
    docker-compose -f docker/docker-compose.dev.yml \
    --project-name hawkeye2020 up \
    --build --abort-on-container-exit
}

genkeys() {
    docker build -f docker/genkeys.Dockerfile \
    -t hawkeye_genkeys ./api && docker run hawkeye_genkeys
}

dbshell() {
    source ./.env && docker exec -it hawkeye2020_db_1_b5f1a6956791 \
    mongo -u $DB_USER \
    -p $DB_PASSWORD \
    --authenticationDatabase $DB_NAME
}

rediscli() {
    docker exec -it hawkeye2020_redis_1 redis-cli
}

"${@:-default}"