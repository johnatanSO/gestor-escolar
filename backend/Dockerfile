FROM node


WORKDIR /src/app

COPY ./package*.json .

run npm install

COPY . .

EXPOSE 4444

CMD ["npm", "start"]