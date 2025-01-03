FROM node:22-alpine3.21

RUN npm i -g @nestjs/cli
# Establece el directorio de trabajo en /app
WORKDIR /app

