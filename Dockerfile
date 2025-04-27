# Use official PHP image with PHP 8.2
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

COPY docker/php/php.ini /usr/local/etc/php/php.ini

# Set working directory
WORKDIR /var/www/html/Valencia-Lighting

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Install Node.js dependencies and build assets for production
RUN npm install && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/Valencia-Lighting \
    && chmod -R 755 /var/www/html/Valencia-Lighting/storage \
    && chmod -R 755 /var/www/html/Valencia-Lighting/bootstrap/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]
