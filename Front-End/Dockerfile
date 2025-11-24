# Étape 1 : build vite
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : nginx
FROM nginx:stable-alpine

# Copier le build
COPY --from=build /app/dist /usr/share/nginx/html

# Copier les règles pour React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
