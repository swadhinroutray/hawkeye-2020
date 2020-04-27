# Hawkeye 2020

## Development

- Install node, npm, go, docker, docker-compose
- Docker requires Linux / macOS / Windows Professional

```sh
$ cd hawkeye-2020
$ npm install --prefix client
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


## Elixirs according to Index
- 0 Extra Hint
- 1 Region Multiplier
- 2 Hangman
- 3 Skip Question
