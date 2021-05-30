<?php
/**
 * Plugin Name: table-of-contents
 * Description: Spis treści w blokowym
 * Version:     1.0.0
 */

function add_gutenberg_assets() {

    wp_register_script(
        'table-of-contents',
        plugin_dir_url( __FILE__ ) . 'build/index.js',
        array( 'wp-blocks' )
    );

    register_block_type( 'rob/table-of-contents', array(
        'editor_script' => 'table-of-contents'
    ) );

}
add_action( 'init', 'add_gutenberg_assets' );