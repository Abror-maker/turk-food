<?php

namespace common\models;

use yii\db\ActiveRecord;

/**
 * @property int $id
 * @property string $email
 * @property int $created_at
 */
class NewsletterSubscriber extends ActiveRecord
{
    public static function tableName()
    {
        return 'newsletter_subscriber';
    }

    public function rules()
    {
        return [
            [['email'], 'required'],
            [['email'], 'email'],
            [['email'], 'unique'],
            [['email'], 'string', 'max' => 150],
            [['created_at'], 'integer'],
        ];
    }

    public function beforeSave($insert)
    {
        if ($insert) {
            $this->created_at = time();
        }
        return parent::beforeSave($insert);
    }
}
