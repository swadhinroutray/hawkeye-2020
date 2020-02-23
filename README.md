# Hawkeye 2020

## Development

- Install node, npm, yarn, go, docker, docker-compose
- Docker requires Linux / Mac OS / Windows professional

```sh
$ cd hawkeye-2020
$ yarn install --prefix client
$ cp .env.example .env
```

- Set environment variables in `.env`
- Generate encryption keys and add them to `.env`

```sh
$ ./Taskfile.sh genkeys
```

## Taskfile commands

```sh
./Taskfile.sh          # (default) run hawk in development mode
./Taskfile.sh start
./Taskfile.sh genkeys  # Generate keys
./Taskfile.sh rediscli # Access redis CLI
./Taskfile.sh dbshell  # Access database shell
```
