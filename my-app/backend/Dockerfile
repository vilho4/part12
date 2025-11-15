FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

RUN npm ci --only=production

COPY . .

CMD ["npm", "run", "start"]

EXPOSE 3001

# npm run dev is the command to start the application in development mode