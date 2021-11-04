# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-alpine3.13

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app


COPY package*.json ./

RUN npm install

COPY . .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8000

EXPOSE ${PORT}
EXPOSE 9229
#CMD [ "node", "." ]