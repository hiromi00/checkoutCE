FROM node:16-alpine3.13

#RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

ENV HOST=0.0.0.0 PORT=8001

EXPOSE ${PORT}
EXPOSE 49153
#CMD ["npm", "start"]