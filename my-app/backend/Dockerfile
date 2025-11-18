FROM node:20

WORKDIR /usr/src/app

# package-tiedostot ensin
COPY package*.json ./

# vain production-riippuvuudet
RUN npm ci --only=production

# Kopioidaan muu koodi
COPY . .

# Käynnistyskomento
CMD ["npm", "run", "start"]

EXPOSE 3001
