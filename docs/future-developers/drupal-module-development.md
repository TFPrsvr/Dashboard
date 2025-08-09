# Drupal PassItOn Module - Developer Guide

## Overview

Technical documentation for developing and customizing the PassItOn Drupal module. This guide covers module architecture, API integration, custom development, and advanced configuration for Drupal developers.

## Module Architecture

### File Structure
```
passiton_widget/
├── config/
│   ├── install/                    # Default configuration
│   │   └── passiton_widget.settings.yml
│   └── schema/                     # Configuration schema
│       └── passiton_widget.schema.yml
├── src/
│   ├── Controller/                 # Page controllers
│   │   ├── AnalyticsController.php
│   │   ├── ApiController.php
│   │   ├── AjaxController.php
│   │   └── WidgetController.php
│   ├── Form/                      # Configuration forms
│   │   ├── ConfigurationForm.php
│   │   ├── WidgetForm.php
│   │   └── WidgetDeleteForm.php
│   ├── Plugin/
│   │   ├── Block/                 # Block plugins
│   │   │   └── PassItOnWidgetBlock.php
│   │   └── Field/                 # Field plugins
│   │       ├── FieldType/
│   │       ├── FieldWidget/
│   │       └── FieldFormatter/
│   ├── Service/                   # Custom services
│   │   ├── ApiService.php
│   │   ├── AnalyticsService.php
│   │   └── WidgetService.php
│   └── EventSubscriber/           # Event subscribers
│       └── WidgetEventSubscriber.php
├── templates/                     # Twig templates
│   ├── passiton-widget.html.twig
│   └── passiton-widget-block.html.twig
├── css/                          # Stylesheets
│   ├── passiton-widget.css
│   └── passiton-admin.css
├── js/                           # JavaScript files
│   ├── passiton-widget-drupal.js
│   ├── passiton-admin.js
│   └── passiton-analytics.js
├── tests/                        # Automated tests
│   ├── src/
│   │   ├── Functional/
│   │   ├── Unit/
│   │   └── Kernel/
│   └── fixtures/
├── passiton_widget.info.yml      # Module definition
├── passiton_widget.module        # Hook implementations
├── passiton_widget.install       # Install/uninstall hooks
├── passiton_widget.libraries.yml # Asset libraries
├── passiton_widget.permissions.yml # Permission definitions
└── passiton_widget.routing.yml   # Route definitions
```

## Core Classes and Services

### Configuration Form (ConfigurationForm.php)
```php
<?php
namespace Drupal\passiton_widget\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ConfigurationForm extends ConfigFormBase {

  protected $apiService;

  public static function create(ContainerInterface $container) {
    $instance = parent::create($container);
    $instance->apiService = $container->get('passiton_widget.api');
    return $instance;
  }

  public function getFormId() {
    return 'passiton_widget_config_form';
  }

  protected function getEditableConfigNames() {
    return ['passiton_widget.settings'];
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('passiton_widget.settings');

    $form['api_settings'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('API Configuration'),
      '#collapsible' => FALSE,
    ];

    $form['api_settings']['organization_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Organization ID'),
      '#default_value' => $config->get('organization_id'),
      '#description' => $this->t('Your PassItOn organization identifier.'),
      '#required' => TRUE,
    ];

    $form['api_settings']['api_key'] = [
      '#type' => 'password',
      '#title' => $this->t('API Key'),
      '#description' => $this->t('Your secure API key for authentication.'),
      '#attributes' => ['autocomplete' => 'new-password'],
    ];

    $form['api_settings']['test_connection'] = [
      '#type' => 'button',
      '#value' => $this->t('Test API Connection'),
      '#ajax' => [
        'callback' => '::testApiConnection',
        'wrapper' => 'test-connection-result',
      ],
    ];

    $form['api_settings']['test_result'] = [
      '#type' => 'markup',
      '#markup' => '<div id="test-connection-result"></div>',
    ];

    return parent::buildForm($form, $form_state);
  }

  public function testApiConnection(array &$form, FormStateInterface $form_state) {
    $organization_id = $form_state->getValue('organization_id');
    $api_key = $form_state->getValue('api_key');
    
    if (empty($api_key)) {
      $api_key = $this->config('passiton_widget.settings')->get('api_key');
    }

    $result = $this->apiService->testConnection($organization_id, $api_key);
    
    $markup = $result['success'] 
      ? '<div class="messages messages--status">' . $this->t('✅ Connection successful') . '</div>'
      : '<div class="messages messages--error">' . $this->t('❌ Connection failed: @error', ['@error' => $result['error']]) . '</div>';

    return [
      '#type' => 'markup',
      '#markup' => $markup,
    ];
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('passiton_widget.settings');
    
    $config->set('organization_id', $form_state->getValue('organization_id'));
    
    // Only update API key if a new one was provided
    if (!empty($form_state->getValue('api_key'))) {
      $config->set('api_key', $form_state->getValue('api_key'));
    }
    
    $config->save();
    
    parent::submitForm($form, $form_state);
  }
}
```

### API Service (ApiService.php)
```php
<?php
namespace Drupal\passiton_widget\Service;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\GuzzleException;

class ApiService {

  protected $httpClient;
  protected $configFactory;
  protected $logger;
  protected $baseUrl = 'https://api.passiton.com/v1';

  public function __construct(
    ClientInterface $http_client,
    ConfigFactoryInterface $config_factory,
    LoggerChannelFactoryInterface $logger_factory
  ) {
    $this->httpClient = $http_client;
    $this->configFactory = $config_factory;
    $this->logger = $logger_factory->get('passiton_widget');
  }

  public function testConnection($organization_id, $api_key) {
    try {
      $response = $this->httpClient->request('GET', $this->baseUrl . '/organizations/' . $organization_id, [
        'headers' => [
          'Authorization' => 'Bearer ' . $api_key,
          'Content-Type' => 'application/json',
          'User-Agent' => 'Drupal-PassItOn-Widget/1.0',
        ],
        'timeout' => 10,
      ]);

      if ($response->getStatusCode() === 200) {
        return ['success' => TRUE];
      }
      
      return ['success' => FALSE, 'error' => 'Invalid response code: ' . $response->getStatusCode()];
      
    } catch (GuzzleException $e) {
      $this->logger->error('API connection test failed: @error', ['@error' => $e->getMessage()]);
      return ['success' => FALSE, 'error' => $e->getMessage()];
    }
  }

  public function getWidgetConfiguration($widget_id) {
    $config = $this->configFactory->get('passiton_widget.settings');
    
    try {
      $response = $this->httpClient->request('GET', $this->baseUrl . '/widgets/' . $widget_id, [
        'headers' => $this->getAuthHeaders(),
        'timeout' => 10,
      ]);

      if ($response->getStatusCode() === 200) {
        return json_decode($response->getBody()->getContents(), TRUE);
      }
      
    } catch (GuzzleException $e) {
      $this->logger->error('Failed to fetch widget configuration: @error', ['@error' => $e->getMessage()]);
    }
    
    return NULL;
  }

  public function trackEvent($event_type, $data) {
    try {
      $this->httpClient->request('POST', $this->baseUrl . '/events/track', [
        'headers' => $this->getAuthHeaders(),
        'json' => [
          'event_type' => $event_type,
          'data' => $data,
          'timestamp' => time(),
          'source' => 'drupal',
        ],
        'timeout' => 5,
      ]);
    } catch (GuzzleException $e) {
      $this->logger->warning('Failed to track event: @error', ['@error' => $e->getMessage()]);
    }
  }

  protected function getAuthHeaders() {
    $config = $this->configFactory->get('passiton_widget.settings');
    
    return [
      'Authorization' => 'Bearer ' . $config->get('api_key'),
      'Content-Type' => 'application/json',
      'User-Agent' => 'Drupal-PassItOn-Widget/1.0',
    ];
  }
}
```

### Widget Block Plugin (PassItOnWidgetBlock.php)
```php
<?php
namespace Drupal\passiton_widget\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a PassItOn Widget block.
 *
 * @Block(
 *   id = "passiton_widget_block",
 *   admin_label = @Translation("PassItOn Widget"),
 *   category = @Translation("Social Impact")
 * )
 */
class PassItOnWidgetBlock extends BlockBase implements BlockPluginInterface, ContainerFactoryPluginInterface {

  protected $widgetService;

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = new static($configuration, $plugin_id, $plugin_definition);
    $instance->widgetService = $container->get('passiton_widget.widget');
    return $instance;
  }

  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    
    $config = $this->getConfiguration();

    $form['widget_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Widget ID'),
      '#description' => $this->t('Enter the widget ID from your PassItOn dashboard.'),
      '#default_value' => $config['widget_id'] ?? '',
      '#required' => TRUE,
    ];

    $form['placement'] = [
      '#type' => 'select',
      '#title' => $this->t('Placement Style'),
      '#options' => [
        'default' => $this->t('Default'),
        'prominent' => $this->t('Prominent'),
        'minimal' => $this->t('Minimal'),
        'sidebar' => $this->t('Sidebar Optimized'),
      ],
      '#default_value' => $config['placement'] ?? 'default',
    ];

    $form['enable_analytics'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable Analytics'),
      '#description' => $this->t('Track widget performance in Drupal analytics dashboard.'),
      '#default_value' => $config['enable_analytics'] ?? TRUE,
    ];

    return $form;
  }

  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    
    $this->configuration['widget_id'] = $form_state->getValue('widget_id');
    $this->configuration['placement'] = $form_state->getValue('placement');
    $this->configuration['enable_analytics'] = $form_state->getValue('enable_analytics');
  }

  public function build() {
    $config = $this->getConfiguration();
    
    if (empty($config['widget_id'])) {
      return [
        '#markup' => $this->t('PassItOn widget not configured.'),
      ];
    }

    return [
      '#theme' => 'passiton_widget_block',
      '#widget_config' => $config,
      '#cache' => [
        'contexts' => ['user.permissions', 'url.path'],
        'tags' => ['config:passiton_widget.settings'],
        'max-age' => 3600, // Cache for 1 hour
      ],
    ];
  }
}
```

## Advanced Development

### Custom Field Type
```php
<?php
namespace Drupal\passiton_widget\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Defines the 'passiton_widget' field type.
 *
 * @FieldType(
 *   id = "passiton_widget",
 *   label = @Translation("PassItOn Widget"),
 *   category = @Translation("Social Impact"),
 *   default_widget = "passiton_widget_default",
 *   default_formatter = "passiton_widget_default"
 * )
 */
class PassItOnWidgetItem extends FieldItemBase {

  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['widget_id'] = DataDefinition::create('string')
      ->setLabel(t('Widget ID'))
      ->setRequired(TRUE);
      
    $properties['placement'] = DataDefinition::create('string')
      ->setLabel(t('Placement'))
      ->setRequired(FALSE);
      
    $properties['custom_config'] = DataDefinition::create('string')
      ->setLabel(t('Custom Configuration'))
      ->setRequired(FALSE);

    return $properties;
  }

  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'widget_id' => [
          'type' => 'varchar',
          'length' => 128,
          'not null' => TRUE,
        ],
        'placement' => [
          'type' => 'varchar',
          'length' => 64,
          'not null' => FALSE,
        ],
        'custom_config' => [
          'type' => 'text',
          'size' => 'big',
          'not null' => FALSE,
        ],
      ],
      'indexes' => [
        'widget_id' => ['widget_id'],
      ],
    ];
  }

  public function isEmpty() {
    return empty($this->get('widget_id')->getValue());
  }
}
```

### Analytics Service
```php
<?php
namespace Drupal\passiton_widget\Service;

use Drupal\Core\Database\Connection;
use Drupal\Core\Session\AccountProxyInterface;

class AnalyticsService {

  protected $database;
  protected $currentUser;

  public function __construct(Connection $database, AccountProxyInterface $current_user) {
    $this->database = $database;
    $this->currentUser = $current_user;
  }

  public function trackEvent($widget_id, $event_type, $metadata = []) {
    if (!$this->currentUser->hasPermission('view passiton analytics')) {
      return FALSE;
    }

    $record = [
      'widget_id' => $widget_id,
      'organization_id' => \Drupal::config('passiton_widget.settings')->get('organization_id'),
      'event_type' => $event_type,
      'node_id' => $metadata['node_id'] ?? NULL,
      'user_id' => $this->currentUser->id(),
      'session_id' => \Drupal::service('session')->getId(),
      'ip_address' => \Drupal::request()->getClientIp(),
      'user_agent' => \Drupal::request()->headers->get('User-Agent'),
      'referrer' => \Drupal::request()->headers->get('Referer'),
      'metadata' => json_encode($metadata),
      'created' => \Drupal::time()->getRequestTime(),
    ];

    try {
      return $this->database->insert('passiton_widget_analytics')
        ->fields($record)
        ->execute();
    } catch (\Exception $e) {
      \Drupal::logger('passiton_widget')->error('Failed to track analytics event: @error', ['@error' => $e->getMessage()]);
      return FALSE;
    }
  }

  public function getWidgetAnalytics($widget_id, $date_range = []) {
    $query = $this->database->select('passiton_widget_analytics', 'pwa')
      ->fields('pwa')
      ->condition('widget_id', $widget_id);

    if (!empty($date_range['start'])) {
      $query->condition('created', strtotime($date_range['start']), '>=');
    }
    
    if (!empty($date_range['end'])) {
      $query->condition('created', strtotime($date_range['end']), '<=');
    }

    return $query->execute()->fetchAll();
  }

  public function generateReport($widget_ids, $date_range = []) {
    $report = [
      'widgets' => [],
      'totals' => [
        'views' => 0,
        'clicks' => 0,
        'donations' => 0,
        'conversion_rate' => 0,
      ],
    ];

    foreach ($widget_ids as $widget_id) {
      $analytics = $this->getWidgetAnalytics($widget_id, $date_range);
      
      $widget_stats = [
        'widget_id' => $widget_id,
        'views' => 0,
        'clicks' => 0,
        'donations' => 0,
        'conversion_rate' => 0,
      ];

      foreach ($analytics as $event) {
        switch ($event->event_type) {
          case 'widget_viewed':
            $widget_stats['views']++;
            break;
          case 'widget_clicked':
            $widget_stats['clicks']++;
            break;
          case 'donation_completed':
            $widget_stats['donations']++;
            break;
        }
      }

      $widget_stats['conversion_rate'] = $widget_stats['clicks'] > 0 
        ? round(($widget_stats['donations'] / $widget_stats['clicks']) * 100, 2)
        : 0;

      $report['widgets'][$widget_id] = $widget_stats;
      
      $report['totals']['views'] += $widget_stats['views'];
      $report['totals']['clicks'] += $widget_stats['clicks'];
      $report['totals']['donations'] += $widget_stats['donations'];
    }

    $report['totals']['conversion_rate'] = $report['totals']['clicks'] > 0 
      ? round(($report['totals']['donations'] / $report['totals']['clicks']) * 100, 2)
      : 0;

    return $report;
  }
}
```

## JavaScript Integration

### Main Widget JavaScript (passiton-widget-drupal.js)
```javascript
(function ($, Drupal, once, drupalSettings) {
  'use strict';

  Drupal.behaviors.passItOnWidget = {
    attach: function (context, settings) {
      once('passiton-widget', '.passiton-widget', context).forEach(function (element) {
        const widgetId = element.dataset.passitOnWidget;
        const orgId = element.dataset.passitOnOrg;
        const placement = element.dataset.passitOnPlacement || 'default';
        
        // Initialize PassItOn widget when API is loaded
        Drupal.passItOnWidget.initialize(element, widgetId, orgId, placement);
      });
    }
  };

  Drupal.passItOnWidget = {
    initialize: function (element, widgetId, orgId, placement) {
      // Wait for PassItOn API to load
      const checkApiReady = function() {
        if (typeof PassItOnWidget !== 'undefined') {
          Drupal.passItOnWidget.createWidget(element, widgetId, orgId, placement);
        } else {
          setTimeout(checkApiReady, 100);
        }
      };
      
      checkApiReady();
    },

    createWidget: function (element, widgetId, orgId, placement) {
      try {
        const widget = new PassItOnWidget({
          element: element,
          widgetId: widgetId,
          organizationId: orgId,
          placement: placement,
          onLoad: function() {
            Drupal.passItOnWidget.trackEvent('widget_loaded', {
              widget_id: widgetId,
              org_id: orgId,
              placement: placement
            });
            
            // Set up intersection observer for view tracking
            Drupal.passItOnWidget.setupViewTracking(element, widgetId, orgId);
          },
          onClick: function() {
            Drupal.passItOnWidget.trackEvent('widget_clicked', {
              widget_id: widgetId,
              org_id: orgId
            });
          },
          onDonationComplete: function(data) {
            Drupal.passItOnWidget.trackEvent('donation_completed', {
              widget_id: widgetId,
              org_id: orgId,
              amount: data.amount,
              currency: data.currency
            });
          }
        });
        
        element.passItOnWidget = widget;
        
      } catch (error) {
        console.error('PassItOn Widget initialization failed:', error);
        Drupal.passItOnWidget.trackEvent('widget_error', {
          widget_id: widgetId,
          error: error.message
        });
      }
    },

    setupViewTracking: function (element, widgetId, orgId) {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting && !element.dataset.viewed) {
              element.dataset.viewed = 'true';
              Drupal.passItOnWidget.trackEvent('widget_viewed', {
                widget_id: widgetId,
                org_id: orgId
              });
            }
          });
        }, {
          threshold: 0.5 // Trigger when 50% visible
        });
        
        observer.observe(element);
      }
    },

    trackEvent: function (eventType, data) {
      // Track in Drupal analytics
      $.ajax({
        url: '/passiton-widget/track',
        method: 'POST',
        data: {
          event_type: eventType,
          data: JSON.stringify(data)
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).fail(function() {
        console.warn('Failed to track PassItOn event:', eventType);
      });

      // Also track in PassItOn analytics if enabled
      if (drupalSettings.passItOnWidget && drupalSettings.passItOnWidget.trackExternal) {
        if (typeof PassItOnAnalytics !== 'undefined') {
          PassItOnAnalytics.track(eventType, data);
        }
      }
    }
  };

})(jQuery, Drupal, once, drupalSettings);
```

## Testing

### Unit Tests Example
```php
<?php
namespace Drupal\Tests\passiton_widget\Unit\Service;

use Drupal\Tests\UnitTestCase;
use Drupal\passiton_widget\Service\ApiService;

/**
 * @coversDefaultClass \Drupal\passiton_widget\Service\ApiService
 * @group passiton_widget
 */
class ApiServiceTest extends UnitTestCase {

  protected $apiService;
  protected $httpClient;
  protected $configFactory;
  protected $logger;

  protected function setUp(): void {
    parent::setUp();
    
    $this->httpClient = $this->createMock('GuzzleHttp\ClientInterface');
    $this->configFactory = $this->createMock('Drupal\Core\Config\ConfigFactoryInterface');
    $this->logger = $this->createMock('Drupal\Core\Logger\LoggerChannelFactoryInterface');
    
    $this->apiService = new ApiService(
      $this->httpClient,
      $this->configFactory, 
      $this->logger
    );
  }

  /**
   * @covers ::testConnection
   */
  public function testConnectionSuccess() {
    $response = $this->createMock('Psr\Http\Message\ResponseInterface');
    $response->method('getStatusCode')->willReturn(200);
    
    $this->httpClient
      ->expects($this->once())
      ->method('request')
      ->willReturn($response);
    
    $result = $this->apiService->testConnection('test_org', 'test_key');
    
    $this->assertTrue($result['success']);
  }

  /**
   * @covers ::testConnection
   */
  public function testConnectionFailure() {
    $this->httpClient
      ->expects($this->once())
      ->method('request')
      ->willThrowException(new \Exception('Connection failed'));
    
    $result = $this->apiService->testConnection('test_org', 'invalid_key');
    
    $this->assertFalse($result['success']);
    $this->assertArrayHasKey('error', $result);
  }
}
```

### Functional Tests Example
```php
<?php
namespace Drupal\Tests\passiton_widget\Functional;

use Drupal\Tests\BrowserTestBase;

/**
 * Tests PassItOn Widget configuration functionality.
 *
 * @group passiton_widget
 */
class ConfigurationTest extends BrowserTestBase {

  protected static $modules = ['passiton_widget'];
  protected $defaultTheme = 'stark';

  protected function setUp(): void {
    parent::setUp();
    
    $admin_user = $this->drupalCreateUser([
      'administer passiton widgets',
      'access administration pages',
    ]);
    
    $this->drupalLogin($admin_user);
  }

  public function testConfigurationForm() {
    $this->drupalGet('/admin/config/services/passiton-widget');
    $this->assertSession()->statusCodeEquals(200);
    $this->assertSession()->pageTextContains('PassItOn Widget Configuration');
    
    // Test form submission
    $edit = [
      'organization_id' => 'test_org_123',
      'api_key' => 'test_key_456',
      'environment' => 'production',
    ];
    
    $this->drupalPostForm(NULL, $edit, 'Save configuration');
    $this->assertSession()->pageTextContains('The configuration options have been saved.');
    
    // Verify saved configuration
    $config = \Drupal::config('passiton_widget.settings');
    $this->assertEquals('test_org_123', $config->get('organization_id'));
    $this->assertEquals('test_key_456', $config->get('api_key'));
  }

  public function testBlockPlacement() {
    // Configure widget first
    $config = \Drupal::configFactory()->getEditable('passiton_widget.settings');
    $config->set('organization_id', 'test_org')
           ->set('api_key', 'test_key')
           ->save();
    
    $this->drupalGet('/admin/structure/block');
    $this->clickLink('Place block');
    $this->clickLink('PassItOn Widget');
    
    $edit = [
      'settings[widget_id]' => 'test_widget_123',
      'settings[placement]' => 'default',
    ];
    
    $this->drupalPostForm(NULL, $edit, 'Save block');
    $this->assertSession()->pageTextContains('The block configuration has been saved.');
  }
}
```

## Performance Optimization

### Caching Strategy
```php
// In your service or controller
public function getCachedWidgetConfig($widget_id) {
  $cache_key = 'passiton_widget:config:' . $widget_id;
  
  if ($cache = \Drupal::cache()->get($cache_key)) {
    return $cache->data;
  }
  
  $config = $this->apiService->getWidgetConfiguration($widget_id);
  
  if ($config) {
    \Drupal::cache()->set($cache_key, $config, time() + 3600, ['passiton_widget']);
  }
  
  return $config;
}
```

### Asset Optimization
```yaml
# passiton_widget.libraries.yml
widget_optimized:
  version: 1.x
  js:
    https://cdn.passiton.com/widget/v2/passiton-widget.min.js:
      type: external
      attributes:
        async: true
        defer: true
        crossorigin: anonymous
      preprocess: false
    js/passiton-widget-drupal.min.js:
      minified: true
      preprocess: false
  css:
    theme:
      css/passiton-widget.min.css:
        minified: true
        preprocess: true
  dependencies:
    - core/jquery
    - core/drupal
    - core/once
```

## Security Best Practices

### Input Validation
```php
public function validateWidgetId($widget_id) {
  // Validate widget ID format
  if (!preg_match('/^[a-zA-Z0-9_-]+$/', $widget_id)) {
    throw new \InvalidArgumentException('Invalid widget ID format');
  }
  
  if (strlen($widget_id) > 128) {
    throw new \InvalidArgumentException('Widget ID too long');
  }
  
  return $widget_id;
}
```

### API Security
```php
protected function sanitizeApiData($data) {
  $allowed_keys = ['widget_id', 'organization_id', 'placement', 'config'];
  
  $sanitized = [];
  foreach ($allowed_keys as $key) {
    if (isset($data[$key])) {
      $sanitized[$key] = \Drupal\Component\Utility\Html::escape($data[$key]);
    }
  }
  
  return $sanitized;
}
```

---

## Deployment Checklist

### Pre-deployment
- [ ] Run all automated tests: `./vendor/bin/phpunit`
- [ ] Check coding standards: `./vendor/bin/phpcs --standard=Drupal`
- [ ] Validate configuration schema
- [ ] Test API connectivity with production credentials
- [ ] Review security permissions

### Production Deployment
- [ ] Enable module on production site
- [ ] Configure API credentials
- [ ] Test widget rendering on key pages
- [ ] Verify analytics tracking
- [ ] Monitor error logs for 24 hours
- [ ] Set up performance monitoring

### Post-deployment
- [ ] Configure automated backups of analytics data
- [ ] Set up monitoring alerts for API failures
- [ ] Schedule regular security updates
- [ ] Document custom configurations for team

---

*This technical guide covers advanced Drupal development for the PassItOn widget module. For basic usage, refer to the business user guide.*

**Module Version**: 1.0.0  
**Last Updated**: January 2025  
**Next Review**: March 2025