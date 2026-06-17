<?php

namespace frontend\controllers;

use common\models\Category;
use common\models\Feedback;
use common\models\Header;
use common\models\Images;
use common\models\Information;
use common\models\Main;
use common\models\Navbar;
use common\models\News;
use common\models\Foods;
use yii\filters\ContentNegotiator;
use yii\web\Controller;
use yii\web\Response;

class ApiController extends Controller
{
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            'contentNegotiator' => [
                'class' => ContentNegotiator::class,
                'formats' => [
                    'application/json' => Response::FORMAT_JSON,
                ],
            ],
        ]);
    }

    public function actionNavbar()
    {
        return [
            'success' => true,
            'data' => Navbar::find()
                ->select(['id', 'Name', 'linki'])
                ->asArray()
                ->all(),
        ];
    }

    public function actionCategories()
    {
        return [
            'success' => true,
            'data' => Category::find()
                ->select(['id', 'Name'])
                ->asArray()
                ->all(),
        ];
    }

    public function actionImages()
    {
        return [
            'success' => true,
            'data' => Images::find()
                ->select(['id', 'rasmlar'])
                ->asArray()
                ->all(),
        ];
    }

    public function actionFeedback()
    {
        return [
            'success' => true,
            'data' => Feedback::find()
                ->select(['id', 'ismi', 'rating', 'text', 'kuni', 'soat'])
                ->asArray()
                ->all(),
        ];
    }

    public function actionNews()
    {
        return [
            'success' => true,
            'data' => News::find()
                ->select(['id', 'img', 'title', 'text', 'kuni'])
                ->asArray()
                ->all(),
        ];
    }

    public function actionSite()
    {
        return [
            'success' => true,
            'data' => [
                'header' => Header::find()->select(['id', 'Mallumotlar'])->asArray()->all(),
                'main' => Main::find()->select(['id', 'Malumotlar'])->asArray()->all(),
                'information' => Information::find()->select(['id', 'malumotl'])->asArray()->all(),
            ],
        ];
    }

    public function actionFoods()
    {
        $foods = Foods::find()
            ->select(['id', 'rasmi', 'Name', 'rating', 'Narxi'])
            ->asArray()
            ->all();

        return [
            'success' => true,
            'data' => $foods,
        ];
    }
}
