<?php


namespace backend\controllers;

use yii\rest\ActiveController;

class InformationController extends ActiveController
{
    public $modelClass = 'common\models\Information';

    public function behaviors()
{
    $behaviors = parent::behaviors();

   
    
    // add CORS filter
    $behaviors['corsFilter'] = [
        'class' => \yii\filters\Cors::class,
    ];


    return $behaviors;
}

}

?>