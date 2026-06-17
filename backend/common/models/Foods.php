<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "foods".
 *
 * @property int $id
 * @property string $rasmi
 * @property string $Name
 * @property int $rating
 * @property string $Narxi
 * @property string|null $category
 */
class Foods extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'foods';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['rasmi', 'Name', 'rating', 'Narxi'], 'required'],
            [['rating'], 'integer'],
            [['category'], 'string', 'max' => 75],
            [['rasmi'], 'string', 'max' => 150],
            [['Name'], 'string', 'max' => 100],
            [['Narxi'], 'string', 'max' => 12],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'rasmi' => 'Rasmi',
            'Name' => 'Name',
            'rating' => 'Rating',
            'Narxi' => 'Narxi',
        ];
    }

}
