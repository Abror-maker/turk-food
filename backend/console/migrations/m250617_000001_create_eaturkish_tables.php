<?php

use yii\db\Migration;

class m250617_000001_create_eaturkish_tables extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%contact_message}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(100)->notNull(),
            'email' => $this->string(150)->notNull(),
            'phone' => $this->string(30),
            'subject' => $this->string(200)->notNull(),
            'message' => $this->text()->notNull(),
            'created_at' => $this->integer()->notNull(),
        ]);

        $this->createTable('{{%newsletter_subscriber}}', [
            'id' => $this->primaryKey(),
            'email' => $this->string(150)->notNull()->unique(),
            'created_at' => $this->integer()->notNull(),
        ]);

        $this->createTable('{{%site_settings}}', [
            'id' => $this->primaryKey(),
            'address' => $this->string(255),
            'phone1' => $this->string(30),
            'phone2' => $this->string(30),
            'email' => $this->string(150),
            'instagram' => $this->string(100),
            'twitter' => $this->string(100),
            'facebook' => $this->string(100),
            'quote' => $this->string(300),
            'weekday_hours' => $this->string(100),
            'weekend_hours' => $this->string(100),
            'about_text' => $this->text(),
            'about_text2' => $this->text(),
            'about_image' => $this->string(255),
            'map_embed' => $this->text(),
        ]);

        $this->insert('{{%site_settings}}', [
            'address' => '9 W 53rd St, London, NY 10019, UK',
            'phone1' => '+1 212-344-1230',
            'phone2' => '+1 212-555-0199',
            'email' => 'eaturkish@gmail.com',
            'instagram' => 'eaturkish',
            'twitter' => 'eaturkish',
            'facebook' => 'eaturkish',
            'quote' => 'The best way to find yourself is to lose yourself in the service of others.',
            'weekday_hours' => 'Monday - Friday: 08:00 am - 12:00 am',
            'weekend_hours' => 'Saturday - Sunday: 07:00 am - 11:00 pm',
            'about_text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'about_text2' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'about_image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
            'map_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215!2d-73.977!3d40.761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzQwLjAiTiA3M8KwNTgnMzcuMiJX!5e0!3m2!1sen!2sus!4v1',
        ]);

        if ($this->db->getTableSchema('{{%foods}}', true) !== null) {
            $table = $this->db->getTableSchema('{{%foods}}');
            if (!isset($table->columns['category'])) {
                $this->addColumn('{{%foods}}', 'category', $this->string(75)->defaultValue('Kebab'));
            }
        }
    }

    public function safeDown()
    {
        if ($this->db->getTableSchema('{{%foods}}', true) !== null) {
            $table = $this->db->getTableSchema('{{%foods}}');
            if (isset($table->columns['category'])) {
                $this->dropColumn('{{%foods}}', 'category');
            }
        }
        $this->dropTable('{{%site_settings}}');
        $this->dropTable('{{%newsletter_subscriber}}');
        $this->dropTable('{{%contact_message}}');
    }
}
