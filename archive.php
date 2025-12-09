<?php

$context = Timber::context();
$context['posts'] = Timber::get_posts();
$context['title'] = single_term_title('', false);

Timber::render('archive.twig', $context);


