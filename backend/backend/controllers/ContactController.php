<?php

namespace backend\controllers;

use common\models\ContactMessage;
use Yii;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\rest\Controller;
use yii\web\Response;

class ContactController extends Controller
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

        $model = new ContactMessage();
        $model->load(Yii::$app->request->bodyParams, '');

        if ($model->save()) {
            return ['success' => true, 'message' => 'Message sent successfully'];
        }

        Yii::$app->response->statusCode = 422;
        return ['success' => false, 'message' => 'Validation failed', 'errors' => $model->errors];
    }
}
