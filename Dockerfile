# Stage 1: Build frontend
FROM node:20.11.1-alpine as build
WORKDIR /app

# Копируем package.json и package-lock.json, если есть
COPY package*.json ./

# Ставим зависимости (но без dev, если не нужны)
RUN npm install

# Копируем исходники
COPY . .

# Сборка фронта
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

# Копируем собранный фронтенд в nginx html директорию
COPY --from=build /app/dist /usr/share/nginx/html

# Настраиваем nginx
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
