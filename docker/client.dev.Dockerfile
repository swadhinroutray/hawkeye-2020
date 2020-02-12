FROM node:alpine

WORKDIR /usr/src/client

COPY package*.json ./
RUN yarn install

COPY . .

ENTRYPOINT ["yarn", "run", "start"]