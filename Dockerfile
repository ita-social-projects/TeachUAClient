# =================================
# STAGE 1: Build React Application
# =================================
FROM node:16.20.0 AS react-build
WORKDIR /react

# Copy only necessary files
COPY package*.json ./
COPY craco.config.js ./
COPY .env.production ./
COPY .env ./
COPY src ./src
COPY public ./public

# Install dependencies and build application
RUN npm install --legacy-peer-deps
RUN npm run build

# =========================
# STAGE 2: RUN NGINX SERVER
# =========================
# Створіть новий етап з образом Nginx
FROM nginx:stable-alpine


# Копіюйте зібраний проект в Nginx контейнер
COPY --from=react-build /react/build /usr/share/nginx/html

# Копіюйте конфігурацію Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Відкрийте порт 80
EXPOSE 80

# Запустіть Nginx
CMD ["nginx", "-g", "daemon off;"]