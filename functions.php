<?php
//additinal functionality

add_theme_support('post-thumbnails');

wp_deregister_script('jquery');
wp_register_script('jquery', 'http://code.jquery.com/jquery-1.11.0.min.js');
wp_enqueue_script('jquery');
register_nav_menu( 'main_nav', 'Main navigation');



