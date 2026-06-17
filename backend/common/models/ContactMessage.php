<?php

namespace common\models;

use yii\db\ActiveRecord;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $subject
 * @property string $message
 * @property int $created_at
 */
class ContactMessage extends ActiveRecord
{
    public static function tableName()
    {
        return 'contact_message';
    }

    public function rules()
    {
        return [
            [['name', 'email', 'subject', 'message'], 'required'],
            [['message'], 'string'],
            [['created_at'], 'integer'],
            [['name'], 'string', 'max' => 100],
            [['email'], 'email'],
            [['email'], 'string', 'max' => 150],
            [['phone'], 'string', 'max' => 30],
            [['subject'], 'string', 'max' => 200],
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
