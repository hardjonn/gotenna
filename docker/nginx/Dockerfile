ARG NGINX_VERSION="1.17.5"
ARG NODE_VERSION="12.13.0"

# build the app
FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY ./spa /app

RUN npm install -g @angular/cli \
  && npm install \
  && ng build --prod

# serve app
FROM nginx:${NGINX_VERSION} AS nginx

COPY --from=build /app/dist/spa /app

RUN rm /etc/nginx/conf.d/default.conf

COPY ./docker/nginx/configs /etc/nginx/conf.d

EXPOSE 80
EXPOSE 4200
