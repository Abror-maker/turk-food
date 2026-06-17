<?php

$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'bootstrap' => ['log'],
    'modules' => [],
    'components' => [
        'request' => [
             'baseUrl'=>'/backend',
            'csrfParam' => '_csrf-backend',
            'parsers' => [
        'application/json' => 'yii\web\JsonParser',
    ]
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'advanced-backend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => \yii\log\FileTarget::class,
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        
        'urlManager' => [
            'scriptUrl'=>'/backend/index.php',
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'GET settings' => 'settings/index',
                'POST contact' => 'contact/index',
                'POST newsletter' => 'newsletter/index',
                ['class' => 'yii\rest\UrlRule', 'controller' => ['navbar', 'category', 'feedback', 'foods', 'images', 'information', 'main', 'news', 'video']],
            ],
        ],
        
    ],
    'params' => $params,
];
