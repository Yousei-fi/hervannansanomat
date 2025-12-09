<?php

require_once __DIR__ . '/vendor/autoload.php';

\Timber\Timber::init();

class HervannansanomatTheme extends \Timber\Site {
    public function __construct() {
        \Timber\Timber::$dirname = ['views', 'src/components'];
        add_action('after_setup_theme', [$this, 'theme_supports']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
        add_filter('timber/context', [$this, 'add_to_context']);
        add_action('pre_get_posts', [$this, 'restrict_search_to_posts']);
        add_action('template_redirect', [$this, 'landing_page_fallbacks']);
        parent::__construct();
    }

    public function theme_supports(): void {
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');
        add_theme_support('custom-logo', [
            'height' => 512,
            'width' => 512,
            'flex-height' => true,
            'flex-width' => true,
        ]);
        add_theme_support('site-icon');
        add_theme_support('html5', ['search-form', 'comment-list', 'comment-form', 'gallery', 'caption']);

        register_nav_menus([
            'main_menu' => __('Main Menu', 'hervannansanomat'),
        ]);
    }

    public function add_to_context(array $context): array {
        $context['menu'] = \Timber\Timber::get_menu('main_menu');
        $context['site'] = $this;
        $context['theme_logo'] = get_template_directory_uri() . '/src/assets/hersa-logo.png';
        $context['categories'] = \Timber\Timber::get_terms([
            'taxonomy' => 'category',
            'hide_empty' => true,
            'parent' => 0,
        ]);

        return $context;
    }

    public function restrict_search_to_posts(\WP_Query $query): void {
        if (!is_admin() && $query->is_main_query() && $query->is_search()) {
            $query->set('post_type', 'post');
        }
    }

    public function landing_page_fallbacks(): void {
        global $wp;
        $request = isset($wp->request) ? trim($wp->request, '/') : trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
        if (in_array($request, ['nakoislehti', 'mainosta'], true)) {
            status_header(200);
            \Timber\Timber::render($request . '.twig', \Timber\Timber::context());
            exit;
        }
    }

    public function enqueue_assets(): void {
        $theme_version = wp_get_theme()->get('Version');

        wp_enqueue_style(
            'hervannansanomat-style',
            get_template_directory_uri() . '/dist/style.css',
            [],
            $theme_version
        );

        wp_enqueue_script(
            'hervannansanomat-js',
            get_template_directory_uri() . '/dist/app.js',
            [],
            $theme_version,
            true
        );
    }
}

new HervannansanomatTheme();

if (defined('WP_CLI') && WP_CLI) {
    \WP_CLI::add_command('hervannansanomat seed-posts', function () {
        $lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis, sem at gravida aliquet, velit nulla facilisis nibh, vitae condimentum nisl risus at ipsum.';
        for ($i = 1; $i <= 10; $i++) {
            $title = "Paikallisuutinen {$i}";
            $existing = get_page_by_title($title, OBJECT, 'post');
            if ($existing) {
                \WP_CLI::log("Skipping existing: {$title}");
                continue;
            }
            $post_id = wp_insert_post([
                'post_title'   => $title,
                'post_content' => $lorem . "\n\n" . $lorem,
                'post_status'  => 'publish',
                'post_author'  => 1,
                'post_type'    => 'post',
            ]);
            if (is_wp_error($post_id)) {
                \WP_CLI::warning("Failed to create {$title}: " . $post_id->get_error_message());
            } else {
                \WP_CLI::success("Created {$title}");
            }
        }
    });
}

