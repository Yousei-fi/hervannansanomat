<?php
/**
 * Template Name: Mainosta tehokkaasti
 */

$context = Timber::context();
$context['post'] = Timber::get_post();

Timber::render('page-mainosta.twig', $context);


