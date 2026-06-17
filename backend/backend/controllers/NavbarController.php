<?php


namespace backend\controllers;

use yii\rest\ActiveController;

class NavbarController extends ActiveController
{
    public $modelClass = 'common\models\Navbar';

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