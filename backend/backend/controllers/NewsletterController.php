<?php

namespace backend\controllers;

use common\models\NewsletterSubscriber;
use Yii;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\rest\Controller;
use yii\web\Response;

class NewsletterController extends Controller
{
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = ['class' => Cors::class];
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => ['index' => ['POST']],
        ];
        return $behaviors;
    }

    public function actionIndex()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $model = new NewsletterSubscriber();
        $params = Yii::$app->request->bodyParams;
        $model->email = $params['email'] ?? Yii::$app->request->post('email', '');

        if ($model->save()) {
            return ['success' => true, 'message' => 'Subscribed successfully'];
        }

        Yii::$app->response->statusCode = 422;
        return ['success' => false, 'message' => 'Validation failed', 'errors' => $model->errors];
    }
}
