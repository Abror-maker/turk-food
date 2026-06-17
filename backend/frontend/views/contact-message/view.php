<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var common\models\ContactMessage $model */

$this->title = 'Message #' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Contact Messages', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="contact-message-view">
    <h1><?= Html::encode($this->title) ?></h1>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'name',
            'email',
            'phone',
            'subject',
            'message:ntext',
            [
                'attribute' => 'created_at',
                'value' => date('Y-m-d H:i:s', $model->created_at),
            ],
        ],
    ]) ?>
</div>
