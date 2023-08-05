FROM node:18.16.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Stage 2
FROM nginx:1.25.1-alpine3.17
COPY --from=node /app/dist/budget-sandbox-web /usr/share/nginx/html