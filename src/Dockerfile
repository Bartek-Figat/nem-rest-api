FROM node:16-alpine3.11

WORKDIR /app

COPY ["./package*.json", "./package-lock.json*", "/app/"]

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]