<?php

use yii\grid\GridView;
use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Newsletter Subscribers';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="newsletter-subscriber-index">
    <h1><?= Html::encode($this->title) ?></h1>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            'id',
            'email',
            [
                'attribute' => 'created_at',
                'value' => fn($m) => date('Y-m-d H:i', $m->created_at),
            ],
        ],
    ]) ?>
</div>
