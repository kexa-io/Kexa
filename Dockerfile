FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "build/index.js"]
#CMD ["sleep","infinity"]