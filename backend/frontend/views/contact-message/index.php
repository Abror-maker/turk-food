<?php

use yii\grid\GridView;
use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Contact Messages';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="contact-message-index">
    <h1><?= Html::encode($this->title) ?></h1>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            'id',
            'name',
            'email',
            'phone',
            'subject',
            [
                'attribute' => 'created_at',
                'value' => fn($m) => date('Y-m-d H:i', $m->created_at),
            ],
            [
                'class' => 'yii\grid\ActionColumn',
                'template' => '{view}',
            ],
        ],
    ]) ?>
</div>
