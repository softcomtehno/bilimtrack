FROM node:20.11.1-alpine as build
WORKDIR /app

# Копируем только package.json и package-lock.json, чтобы кэшировалось
COPY package*.json ./

# Детерминированная установка (требует package-lock.json)
RUN npm ci --omit=dev

# Копируем исходники
COPY . .

# Собираем проект
RUN npm run build

# ---
# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Конфиг nginx
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
