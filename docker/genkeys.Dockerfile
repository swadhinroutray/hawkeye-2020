FROM golang:alpine

WORKDIR /script

ADD . /script

RUN go build hawkeye2020/api/cmd/genkeys

CMD ./genkeys