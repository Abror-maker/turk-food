<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "news".
 *
 * @property int $id
 * @property string $img
 * @property string $title
 * @property string $text
 * @property string $kuni
 */
class News extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'news';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['img', 'title', 'text', 'kuni'], 'required'],
            [['img'], 'string', 'max' => 150],
            [['title'], 'string', 'max' => 75],
            [['text'], 'string', 'max' => 120],
            [['kuni'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'img' => 'Img',
            'title' => 'Title',
            'text' => 'Text',
            'kuni' => 'Kuni',
        ];
    }

}
