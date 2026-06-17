<?php

namespace frontend\controllers;

use common\models\ContactMessage;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class ContactMessageController extends Controller
{
    public function actionIndex()
    {
        $dataProvider = new ActiveDataProvider([
            'query' => ContactMessage::find()->orderBy(['created_at' => SORT_DESC]),
            'pagination' => ['pageSize' => 20],
        ]);

        return $this->render('index', ['dataProvider' => $dataProvider]);
    }

    public function actionView($id)
    {
        return $this->render('view', ['model' => $this->findModel($id)]);
    }

    protected function findModel($id)
    {
        if (($model = ContactMessage::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException('Message not found.');
    }
}
