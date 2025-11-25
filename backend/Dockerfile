FROM node:18-alpine

WORKDIR /app

# Copie seulement les fichiers nécessaires à l'installation
COPY package*.json ./

# Installe uniquement les dépendances de production
RUN npm ci --only=production

# Copie le reste du code
COPY . .

# Définir NODE_ENV en production
ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]
