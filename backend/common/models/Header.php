<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "header".
 *
 * @property int $id
 * @property int $Mallumotlar
 */
class Header extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'header';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['Mallumotlar'], 'required'],
            [['Mallumotlar'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'Mallumotlar' => 'Mallumotlar',
        ];
    }

}
