<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "footer".
 *
 * @property int $id
 * @property string $malumotlar
 * @property string $logo
 */
class Footer extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'footer';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'malumotlar', 'logo'], 'required'],
            [['id'], 'integer'],
            [['malumotlar'], 'string', 'max' => 250],
            [['logo'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'malumotlar' => 'Malumotlar',
            'logo' => 'Logo',
        ];
    }

}
