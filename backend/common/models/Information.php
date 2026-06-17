<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "information".
 *
 * @property int $id
 * @property string $malumotl
 * @property string $logo
 */
class Information extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'information';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['malumotl', 'logo'], 'required'],
            [['malumotl'], 'string', 'max' => 200],
            [['logo'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'malumotl' => 'Malumotl',
            'logo' => 'Logo',
        ];
    }

}
