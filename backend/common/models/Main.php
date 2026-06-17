<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "main".
 *
 * @property int $id
 * @property string $Malumotlar
 */
class Main extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'main';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['Malumotlar'], 'required'],
            [['Malumotlar'], 'string', 'max' => 150],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'Malumotlar' => 'Malumotlar',
        ];
    }

}
