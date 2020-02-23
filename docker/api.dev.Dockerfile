FROM golang:alpine

ENV GO111MODULE=on

WORKDIR /usr/src/api

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

RUN go get -u github.com/githubnemo/CompileDaemon

COPY dev.api.sh .
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .
CMD /wait && ./dev.api.sh