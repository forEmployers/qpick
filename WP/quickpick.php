<?php

/**
 * Plugin Name: QuickPick
 * Plugin URI: https://www.maxking.com.au
 * Description: Moving quote calculator. Shortcode: [qp-quote]
 * Version: 1.0
 * Author: Attila Meszaros
 * Author URI: http://maxking.com.au
 **/

add_shortcode('qp-quote', 'render');

/**
* Render plugin frontend
* @return null
*/
function render()
{
    # NO ADMIN
    if (is_admin()) {
        return;
    }

    # ONLY RELEVANT SCRIPTS
    getDependencies();

    return file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'index.html');
}

/**
* Get dependencies
* @return null
*/
function getDependencies()
{
    if (is_admin()) {
        return;
    }

    $basepath = plugin_dir_url(__FILE__);

    # stylesheets - First param must be unique
    wp_enqueue_style('MAXKING-STYLE', $basepath . '/static/css/2.ee0ceef3.chunk.css');

    # scripts - First param must be unique
    wp_enqueue_script('MAXKING-CHUNK',  $basepath . '/static/js/2.07d15fad.chunk.js');
    wp_enqueue_script('MAXKING-MAINS',  $basepath . '/static/js/main.4827e727.chunk.js');
}