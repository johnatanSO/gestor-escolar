FROM node


WORKDIR /usr/vendergas

COPY ./package*.json .

run npm install

COPY . .

EXPOSE 4444

CMD ["npm", "start"]