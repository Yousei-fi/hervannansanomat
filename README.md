# Hervannansanomat Theme

WordPress theme built with Timber (Twig), Tailwind CSS, and Vite.

## Local Development

1. Install PHP dependencies:

```bash
composer install
```

2. Install Node dependencies:

```bash
npm install
```

3. Run the development server with hot reload:

```bash
npm run dev
```

4. Build production assets:

```bash
npm run build
```

Copy the theme into `wp-content/themes/hervannansanomat` in your WordPress installation and activate it from the WordPress admin.

## Docker Compose Stack

The repository includes a ready-to-run Docker Compose setup that provisions WordPress and MySQL with the theme prebuilt inside the image.

1. Copy the environment template and adjust the secrets (create a `.env` file with required variables):

   ```bash
   WORDPRESS_DB_USER=wordpress
   WORDPRESS_DB_PASSWORD=your_password
   MYSQL_ROOT_PASSWORD=your_root_password
   WP_HOME=https://hervannansanomat.yousei.fi
   WP_SITEURL=https://hervannansanomat.yousei.fi
   WORDPRESS_HTTP_PORT=8093
   ```

2. Build and start the stack:

   ```bash
   docker compose up -d --build
   ```

3. Visit `http://localhost:8093` (or the port from `.env`) to finish the WordPress install wizard.

### Services

- `wordpress`: Custom image based on `wordpress:6.7.1-php8.2-apache` that installs dependencies, compiles assets, and copies the theme into `/usr/src/wordpress/wp-content/themes/hervannansanomat`. Exposed on port 8093 by default.
- `db`: MySQL 8.0 with persistent storage in the `db_data` volume.

Persistent data lives in the named volumes `wordpress_data` (WordPress core + uploads) and `db_data` (database). Local uploads are also mirrored to `./wp-data/uploads`.

### Troubleshooting

- If Apache serves a directory listing or `GET /wp-admin/install.php` returns 404, it means `/var/www/html` never received the WordPress core files. Remove the `wordpress_data` volume so the container can repopulate it:

  ```bash
  docker compose down
  docker volume rm hervannansanomat_wordpress_data
  docker compose up -d --build
  ```

- Do **not** bind-mount the theme over `wp-content/themes/hervannansanomat` in production—it's already baked into the image and the mount can block WordPress from copying its core files. For local overrides, create a `docker-compose.override.yml` instead.

- After WordPress responds successfully over plain HTTP, retrigger Let's Encrypt (e.g. by restarting Traefik or Coolify's proxy) so HTTPS can be reissued.

## Deployment (Coolify)

1. Connect Coolify to this repository and choose the Docker Compose template.
2. Provide environment variables for database credentials, `WP_HOME`, and `WP_SITEURL`.
3. Coolify will build the custom WordPress image, run `composer install`, `npm ci`, and `npm run build` inside the container, and deploy automatically.

Optional: add a GitHub Action to build and push a container image or run theme tests before deployment.

