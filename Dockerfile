FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
COPY patches ./patches
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
