<?php

namespace frontend\controllers;

use common\models\NewsletterSubscriber;
use yii\data\ActiveDataProvider;
use yii\web\Controller;

class NewsletterSubscriberController extends Controller
{
    public function actionIndex()
    {
        $dataProvider = new ActiveDataProvider([
            'query' => NewsletterSubscriber::find()->orderBy(['created_at' => SORT_DESC]),
            'pagination' => ['pageSize' => 20],
        ]);

        return $this->render('index', ['dataProvider' => $dataProvider]);
    }
}
