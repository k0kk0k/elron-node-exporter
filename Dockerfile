FROM node:12

COPY . .

RUN npm install && npm run build
ENTRYPOINT ["npm", "start"]

EXPOSE 8081
