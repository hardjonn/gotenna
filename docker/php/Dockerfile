ARG PHP_VERSION="7.2-fpm"

FROM php:${PHP_VERSION} AS php

RUN apt-get update && apt-get install -y \
  curl \
  git \
  net-tools \
  supervisor \
  zip \
  libzip-dev \
  zlib1g-dev \
  sqlite3 \
  libsqlite3-dev \
  && pecl install xdebug-2.8.0 \
  && docker-php-ext-enable xdebug \
  && docker-php-ext-install pdo_mysql mysqli zip

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY --chown=www-data:www-data ./api /app

COPY docker/php/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN composer install --prefer-source --no-interaction && rm -rf /root/.composer

ENV PATH="~/.composer/vendor/bin:./vendor/bin:${PATH}"

EXPOSE 9000

CMD ["php-fpm", "-R", "-F", "--nodaemonize"]
