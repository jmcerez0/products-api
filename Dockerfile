FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npx prisma generate && npm run build

EXPOSE 3000

CMD [ "node", "dist/main", "&&", "npm", "run", "migrate:dev" ]