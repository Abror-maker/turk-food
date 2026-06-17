<?php

use yii\db\Migration;

class m240608_000001_add_rating_to_feedback extends Migration
{
    public function up()
    {
        $this->addColumn('{{%feedback}}', 'rating', $this->integer()->defaultValue(5)->after('ismi'));
    }

    public function down()
    {
        $this->dropColumn('{{%feedback}}', 'rating');
    }
}
