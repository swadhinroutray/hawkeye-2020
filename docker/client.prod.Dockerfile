FROM node:alpine AS builder

WORKDIR /usr/src/client

ENV NODE_ENV production

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/client/build /usr/share/nginx/html

CMD /bin/sh -c "cat /etc/nginx/conf.d/hawkeye.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"