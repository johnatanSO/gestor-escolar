FROM node

WORKDIR /usr/app

COPY ./package.json ./

RUN ls

RUN npm install

RUN ls

COPY . .

RUN ls

RUN npm install bcrypt

EXPOSE 4444

CMD ["npm", "start"]