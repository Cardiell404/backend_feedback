FROM node:alpine as builder

LABEL authors="Luis G"

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g @angular/cli

# run the command
RUN npm run build

FROM nginx

# expose the port
EXPOSE 8080

# copy nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/feedback /usr/share/nginx/html