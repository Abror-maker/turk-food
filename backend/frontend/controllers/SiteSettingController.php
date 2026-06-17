<?php

namespace frontend\controllers;

use common\models\SiteSetting;
use Yii;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class SiteSettingController extends Controller
{
    public function actionUpdate()
    {
        $model = SiteSetting::find()->one();
        if (!$model) {
            throw new NotFoundHttpException('Settings not found.');
        }

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            Yii::$app->session->setFlash('success', 'Settings saved.');
            return $this->redirect(['update']);
        }

        return $this->render('update', ['model' => $model]);
    }
}
