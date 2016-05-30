FROM node:6.2.0

MAINTAINER Vincenzo FERME <info@vincenzoferme.it>

## Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

## Bundle app source
COPY . /usr/src/app

## Copy wait-for-it utility and give it execution priviledges (ref: https://github.com/vishnubob/wait-for-it)
COPY ./bin/wait-for-it.sh /
RUN chmod +x /wait-for-it.sh

## Copy the wait-for-it wrapper script to wait for Mongo and Redis and give it execution priviledges
COPY ./bin/wait-for-mongo-redis.sh /
RUN chmod +x /wait-for-mongo-redis.sh

EXPOSE 3000

ENTRYPOINT [ "/wait-for-mongo-redis.sh" ]
CMD [ "npm", "start" ]