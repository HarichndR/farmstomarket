
FROM node:16

WORKDIR /app


COPY package*.json ./
COPY ./

RUN npm install

COPY . .

EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
