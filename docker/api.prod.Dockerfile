FROM golang:alpine AS builder

ENV GO111MODULE=on

WORKDIR /usr/src/api

COPY go.sum .
COPY go.mod .

RUN go mod download

COPY . .

RUN go build -ldflags="-s -w" hawkeye2020/api/cmd/hawkeye

FROM alpine

WORKDIR /root

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait wait
RUN chmod +x wait

COPY --from=builder /usr/src/api/hawkeye .
CMD ./wait && ./hawkeye