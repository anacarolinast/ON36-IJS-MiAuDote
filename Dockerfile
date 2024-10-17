FROM node:20

WORKDIR /app

COPY new_api/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

