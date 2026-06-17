<?php

namespace backend\controllers;

use common\models\SiteSetting;
use Yii;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\rest\Controller;
use yii\web\Response;

class SettingsController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = ['class' => Cors::class];
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => ['index' => ['GET']],
        ];
        return $behaviors;
    }

    public function actionIndex()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        return SiteSetting::getSettings();
    }
}
