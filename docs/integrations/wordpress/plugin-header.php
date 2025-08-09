<?php
/**
 * Plugin Name: PassItOn Donation Widget
 * Plugin URI: https://passiton.com/wordpress
 * Description: Add customizable donation widgets to your WordPress site. Enable visitors to support causes they care about with seamless integration and powerful analytics.
 * Version: 1.0.0
 * Author: PassItOn Team
 * Author URI: https://passiton.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: passiton
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 * 
 * PassItOn Donation Widget is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 * 
 * PassItOn Donation Widget is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with PassItOn Donation Widget. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('PASSITON_VERSION', '1.0.0');
define('PASSITON_PLUGIN_URL', plugin_dir_url(__FILE__));
define('PASSITON_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('PASSITON_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('PASSITON_API_BASE', 'https://api.passiton.com/v1');
define('PASSITON_WIDGET_BASE', 'https://widget.passiton.com');

/**
 * Main PassItOn Plugin Class
 */
class PassItOnPlugin {
    
    /**
     * Plugin instance
     */
    private static $instance = null;
    
    /**
     * Get plugin instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        add_action('init', array($this, 'init'));
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        register_uninstall_hook(__FILE__, array('PassItOnPlugin', 'uninstall'));
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Load text domain for translations
        load_plugin_textdomain('passiton', false, dirname(PASSITON_PLUGIN_BASENAME) . '/languages');
        
        // Initialize admin interface if in admin
        if (is_admin()) {
            $this->init_admin();
        }
        
        // Initialize frontend functionality
        $this->init_frontend();
        
        // Register shortcodes
        $this->register_shortcodes();
        
        // Register Gutenberg blocks
        $this->register_blocks();
        
        // Add widget areas
        $this->register_widgets();
    }
    
    /**
     * Initialize admin interface
     */
    private function init_admin() {
        // Add admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Add settings link to plugins page
        add_filter('plugin_action_links_' . PASSITON_PLUGIN_BASENAME, array($this, 'add_settings_link'));
        
        // Enqueue admin scripts and styles
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        
        // Register settings
        add_action('admin_init', array($this, 'register_settings'));
        
        // Add dashboard widget
        add_action('wp_dashboard_setup', array($this, 'add_dashboard_widget'));
    }
    
    /**
     * Initialize frontend functionality
     */
    private function init_frontend() {
        // Enqueue frontend scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'frontend_enqueue_scripts'));
        
        // Add meta tags for widget configuration
        add_action('wp_head', array($this, 'add_widget_meta'));
        
        // Process donation webhooks
        add_action('wp_ajax_nopriv_passiton_webhook', array($this, 'handle_webhook'));
        add_action('wp_ajax_passiton_webhook', array($this, 'handle_webhook'));
    }
    
    /**
     * Register shortcodes
     */
    private function register_shortcodes() {
        add_shortcode('passiton_widget', array($this, 'widget_shortcode'));
        add_shortcode('passiton_button', array($this, 'button_shortcode'));
        add_shortcode('passiton_progress', array($this, 'progress_shortcode'));
    }
    
    /**
     * Register Gutenberg blocks
     */
    private function register_blocks() {
        if (function_exists('register_block_type')) {
            add_action('init', array($this, 'register_gutenberg_blocks'));
        }
    }
    
    /**
     * Register widgets
     */
    private function register_widgets() {
        add_action('widgets_init', array($this, 'register_widget_areas'));
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create database tables if needed
        $this->create_tables();
        
        // Set default options
        $this->set_default_options();
        
        // Schedule cron jobs
        $this->schedule_cron_jobs();
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Clear cron jobs
        wp_clear_scheduled_hook('passiton_sync_donations');
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin uninstall
     */
    public static function uninstall() {
        // Remove options
        delete_option('passiton_settings');
        delete_option('passiton_widgets');
        
        // Remove database tables
        global $wpdb;
        $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}passiton_donations");
        
        // Clear any cached data
        wp_cache_flush();
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            __('PassItOn Settings', 'passiton'),
            __('PassItOn', 'passiton'),
            'manage_options',
            'passiton',
            array($this, 'admin_page'),
            'dashicons-heart',
            30
        );
        
        add_submenu_page(
            'passiton',
            __('Widget Settings', 'passiton'),
            __('Widgets', 'passiton'),
            'manage_options',
            'passiton-widgets',
            array($this, 'widgets_page')
        );
        
        add_submenu_page(
            'passiton',
            __('Donation Analytics', 'passiton'),
            __('Analytics', 'passiton'),
            'manage_options',
            'passiton-analytics',
            array($this, 'analytics_page')
        );
    }
    
    /**
     * Add settings link to plugins page
     */
    public function add_settings_link($links) {
        $settings_link = '<a href="admin.php?page=passiton">' . __('Settings', 'passiton') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
    
    /**
     * Widget shortcode handler
     */
    public function widget_shortcode($atts) {
        $atts = shortcode_atts(array(
            'id' => '',
            'type' => 'standard',
            'amount' => '',
            'cause' => '',
            'goal' => '',
            'style' => ''
        ), $atts);
        
        if (empty($atts['id'])) {
            return '<p>' . __('Please specify a widget ID.', 'passiton') . '</p>';
        }
        
        return $this->render_widget($atts);
    }
    
    /**
     * Render donation widget
     */
    private function render_widget($atts) {
        $widget_id = sanitize_text_field($atts['id']);
        $widget_type = sanitize_text_field($atts['type']);
        
        $output = '<div class="passiton-widget" data-widget-id="' . esc_attr($widget_id) . '" data-type="' . esc_attr($widget_type) . '">';
        $output .= '<div id="passiton-widget-' . esc_attr($widget_id) . '"></div>';
        $output .= '</div>';
        
        return $output;
    }
    
    /**
     * Enqueue frontend scripts
     */
    public function frontend_enqueue_scripts() {
        wp_enqueue_script(
            'passiton-widget',
            PASSITON_WIDGET_BASE . '/wordpress.js',
            array('jquery'),
            PASSITON_VERSION,
            true
        );
        
        wp_enqueue_style(
            'passiton-widget',
            PASSITON_WIDGET_BASE . '/wordpress.css',
            array(),
            PASSITON_VERSION
        );
        
        // Localize script with settings
        wp_localize_script('passiton-widget', 'passiton_settings', array(
            'api_base' => PASSITON_API_BASE,
            'widget_base' => PASSITON_WIDGET_BASE,
            'site_url' => get_site_url(),
            'nonce' => wp_create_nonce('passiton_nonce')
        ));
    }
    
    /**
     * Admin page content
     */
    public function admin_page() {
        include PASSITON_PLUGIN_PATH . 'admin/pages/settings.php';
    }
    
    /**
     * Widgets page content
     */
    public function widgets_page() {
        include PASSITON_PLUGIN_PATH . 'admin/pages/widgets.php';
    }
    
    /**
     * Analytics page content
     */
    public function analytics_page() {
        include PASSITON_PLUGIN_PATH . 'admin/pages/analytics.php';
    }
}

// Initialize plugin
PassItOnPlugin::get_instance();