# Usa una imagen base de Node para construir la app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY . .

RUN npm install
RUN npm run build

# Usa una imagen ligera de Nginx para servir la app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]