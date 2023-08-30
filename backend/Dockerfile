FROM node

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install

RUN npm install bcrypt

COPY . .

EXPOSE 4444

CMD ["npm", "start"]