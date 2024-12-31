FROM node:23-alpine3.20

RUN npm i -g @nestjs/cli
# Establece el directorio de trabajo en /app
WORKDIR /app

