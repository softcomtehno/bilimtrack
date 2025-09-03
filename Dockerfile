# ---- Build stage ----
FROM node:20.11.1-alpine AS build

WORKDIR /app

COPY package*.json ./

COPY . .

# ⚡ Explicitly set memory limit before build
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build


# ---- Production stage ----
FROM nginx:alpine

# Copy build artifacts
COPY --from=build /app/dist /usr/share/nginx/html

# Basic Nginx SPA config
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
