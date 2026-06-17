<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var common\models\Foods $model */

$this->title = 'Create Foods';
$this->params['breadcrumbs'][] = ['label' => 'Foods', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="foods-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
