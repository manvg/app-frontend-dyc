# 1) Build de Angular
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci -- --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration production

# 2) Servir con Nginx
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestro nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build al html de nginx
COPY --from=builder /app/dist/app-frontend-dyc /usr/share/nginx/html

# Exponemos 80 y 443
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
