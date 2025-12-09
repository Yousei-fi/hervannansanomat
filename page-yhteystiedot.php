<?php
/**
 * Template Name: Yhteystiedot ja ilmoitukset
 */

$context = Timber::context();
$context['post'] = Timber::get_post();

Timber::render('page-yhteystiedot.twig', $context);


