FROM node:18.7.0-alpine3.15

RUN apk add --no-cache bash

USER root

WORKDIR /home/node/app

COPY package.json /home/node/app

COPY . /home/node/app/
