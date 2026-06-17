<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "navbar".
 *
 * @property int $id
 * @property string $Name
 * @property string $linki
 */
class Navbar extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'navbar';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['Name', 'linki'], 'required'],
            [['Name', 'linki'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'Name' => 'Name',
            'linki' => 'Linki',
        ];
    }

}
