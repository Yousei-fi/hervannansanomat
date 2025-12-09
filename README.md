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

## Deployment (Coolify)

1. Connect Coolify to this repository and choose the Docker Compose template (if available).
2. Provide environment variables for database credentials, `WP_HOME`, and `WP_SITEURL`.
3. Coolify will build the custom WordPress image, run `composer install`, `npm ci`, and `npm run build` inside the container, and deploy automatically.

