FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3001

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev"]