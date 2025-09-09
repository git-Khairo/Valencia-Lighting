FROM composer:2.8.5 AS builder
WORKDIR /app
COPY . /app
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress

FROM php:8.2-apache

ENV TZ="Etc/GMT-3"
ENV APP_DIR=/var/www/html/Valencia-Lighting
ENV APACHE_DOCUMENT_ROOT=${APP_DIR}/public

RUN apt-get update && apt-get install -y \
    git curl zip unzip gnupg pkg-config \
    libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
    libxml2-dev libzip-dev libbz2-dev libsodium-dev libonig-dev \
 && docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j"$(nproc)" exif bcmath sockets zip bz2 sodium gd pdo_mysql mbstring opcache \
 && a2enmod rewrite headers \
 && echo "ServerName localhost" > /etc/apache2/conf-available/servername.conf && a2enconf servername \
 && sed -i 's/Listen 80/Listen 9000/' /etc/apache2/ports.conf \
 && sed -i 's!<VirtualHost \*:80>!<VirtualHost *:9000>!' /etc/apache2/sites-available/000-default.conf \
 && sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
      /etc/apache2/sites-available/*.conf /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
 && printf "<Directory ${APACHE_DOCUMENT_ROOT}>\n\tAllowOverride All\n\tRequire all granted\n</Directory>\n" \
      > /etc/apache2/conf-available/override.conf \
 && a2enconf override \
 && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g npm@latest \
 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app ${APP_DIR}
WORKDIR ${APP_DIR}

COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

RUN (npm ci || npm install) && npm run build || true
RUN php artisan storage:link || true
RUN chown -R www-data:www-data ${APP_DIR} && chmod -R 0775 ${APP_DIR}/storage ${APP_DIR}/bootstrap/cache

EXPOSE 9000
CMD ["apache2-foreground"]
