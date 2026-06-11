# שלב 1: בניית האפליקציה (Build Stage)
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# שלב 2: הגשת הקבצים הסטטיים באמצעות Nginx (Production Stage)
FROM nginx:alpine

# שינינו מ- /app/build ל- /app/dist בהתאם ל-Vite
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]