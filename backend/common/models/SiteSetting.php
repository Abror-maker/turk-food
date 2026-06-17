<?php

namespace common\models;

use yii\db\ActiveRecord;

/**
 * @property int $id
 * @property string $address
 * @property string $phone1
 * @property string $phone2
 * @property string $email
 * @property string $instagram
 * @property string $twitter
 * @property string $facebook
 * @property string $quote
 * @property string $weekday_hours
 * @property string $weekend_hours
 * @property string $about_text
 * @property string $about_text2
 * @property string $about_image
 * @property string $map_embed
 */
class SiteSetting extends ActiveRecord
{
    public static function tableName()
    {
        return 'site_settings';
    }

    public function rules()
    {
        return [
            [['address', 'phone1', 'phone2', 'email', 'instagram', 'twitter', 'facebook', 'quote', 'weekday_hours', 'weekend_hours', 'about_image', 'map_embed'], 'string'],
            [['about_text', 'about_text2'], 'string'],
            [['address', 'about_image', 'map_embed'], 'string', 'max' => 255],
            [['phone1', 'phone2'], 'string', 'max' => 30],
            [['email'], 'string', 'max' => 150],
            [['instagram', 'twitter', 'facebook'], 'string', 'max' => 100],
            [['quote'], 'string', 'max' => 300],
            [['weekday_hours', 'weekend_hours'], 'string', 'max' => 100],
        ];
    }

    public static function getSettings(): array
    {
        $row = static::find()->one();
        if (!$row) {
            return [];
        }

        return [
            'address' => $row->address,
            'phone1' => $row->phone1,
            'phone2' => $row->phone2,
            'email' => $row->email,
            'instagram' => $row->instagram,
            'twitter' => $row->twitter,
            'facebook' => $row->facebook,
            'tagline' => $row->quote,
            'quote' => $row->quote,
            'weekdayHours' => $row->weekday_hours,
            'weekendHours' => $row->weekend_hours,
            'aboutText1' => $row->about_text,
            'aboutText2' => $row->about_text2,
            'aboutImage' => $row->about_image,
            'mapEmbed' => $row->map_embed,
        ];
    }
}
