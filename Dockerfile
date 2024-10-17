FROM node:20

WORKDIR /app/new_api

COPY new_api/package*.json ./

RUN npm install

COPY new_api/ .

EXPOSE 3000

CMD ["npm", "start"]
