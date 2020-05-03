:start
    docker-compose -f docker/docker-compose.dev.yml --project-name hawkeye2020 up --build --abort-on-container-exit
EXIT /B 0

:genkeys
    docker build -f docker/genkeys.Dockerfile -t hawkeye_genkeys ./api && docker run hawkeye_genkeys
EXIT /B 0

:dbshell
    source ./.env && docker exec -it hawkeye2020_db_1 mongo -u $DB_USER -p $DB_PASSWORD --authenticationDatabase $DB_NAME
EXIT /B 0

:rediscli 
    docker exec -it hawkeye2020_redis_1 redis-cli
EXIT /B 0

CALL %~f1
