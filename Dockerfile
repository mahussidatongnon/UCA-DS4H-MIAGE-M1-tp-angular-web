# Etape 1 : Construire le projet Angular
FROM node:18.17.1 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etape 2 : Serveur HTTP pour les fichiers statiques
FROM nginx:1.21.4-alpine
COPY --from=build /app/dist/assignment-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
