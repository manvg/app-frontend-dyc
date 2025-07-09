# 1) Build de Angular
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos package.json y lock para cachear npm install
COPY package*.json ./
RUN npm ci -- – legacy-peer-deps

# Copiamos el resto y generamos el build de producción
COPY . .
RUN npm run build -- --configuration production

# 2) Servir con Nginx
FROM nginx:stable-alpine
# Eliminamos la configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copiamos nuestro config 
COPY nginx.conf /etc/nginx/conf.d

# Copiamos la carpeta dist al directorio de nginx
COPY --from=builder /app/dist/app-frontend-dyc /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Arrancamos nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
