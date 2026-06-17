<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var common\models\SiteSetting $model */

$this->title = 'Site Settings';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-setting-update">
    <h1><?= Html::encode($this->title) ?></h1>

    <?php $form = ActiveForm::begin(); ?>

    <div class="row">
        <div class="col-md-6">
            <?= $form->field($model, 'address')->textInput() ?>
            <?= $form->field($model, 'phone1')->textInput() ?>
            <?= $form->field($model, 'phone2')->textInput() ?>
            <?= $form->field($model, 'email')->textInput() ?>
            <?= $form->field($model, 'instagram')->textInput() ?>
            <?= $form->field($model, 'twitter')->textInput() ?>
            <?= $form->field($model, 'facebook')->textInput() ?>
        </div>
        <div class="col-md-6">
            <?= $form->field($model, 'quote')->textarea(['rows' => 3]) ?>
            <?= $form->field($model, 'weekday_hours')->textInput() ?>
            <?= $form->field($model, 'weekend_hours')->textInput() ?>
            <?= $form->field($model, 'about_text')->textarea(['rows' => 4]) ?>
            <?= $form->field($model, 'about_text2')->textarea(['rows' => 4]) ?>
            <?= $form->field($model, 'about_image')->textInput() ?>
            <?= $form->field($model, 'map_embed')->textarea(['rows' => 3]) ?>
        </div>
    </div>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>
</div>
