<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "feedback".
 *
 * @property int $id
 * @property string $ismi
 * @property int $rating
 * @property string $text
 * @property string $kuni
 * @property string $soat
 * @property int $prosmotret
 */
class Feedback extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'feedback';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ismi', 'text', 'kuni', 'soat', 'prosmotret', 'rating'], 'required'],
            [['prosmotret', 'rating'], 'integer'],
            [['ismi'], 'string', 'max' => 50],
            [['text'], 'string', 'max' => 250],
            [['kuni'], 'string', 'max' => 25],
            [['soat'], 'string', 'max' => 10],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'ismi' => 'Ismi',
            'rating' => 'Rating',
            'text' => 'Text',
            'kuni' => 'Kuni',
            'soat' => 'Soat',
            'prosmotret' => 'Prosmotret',
        ];
    }

}
