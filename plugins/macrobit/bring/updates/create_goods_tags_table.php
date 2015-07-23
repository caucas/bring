<?php namespace Macrobit\Bring\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateGoodsTagsTable extends Migration
{

    public function up()
    {
        Schema::create('macrobit_bring_goods_tags', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('title')->nullable();
            $table->timestamps();
        });

        Schema::create('macrobit_bring_goods_tags_goods', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('goods_tag_id')->unsigned()->nullable();
            $table->integer('goods_id')->unsigned()->nullable();
            $table->primary(['goods_tag_id', 'goods_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('macrobit_bring_goods_tags');
        Schema::dropIfExists('macrobit_bring_goods_tags_goods');
    }

}
