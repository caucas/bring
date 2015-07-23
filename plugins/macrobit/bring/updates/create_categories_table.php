<?php namespace Macrobit\Bring\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateCategoriesTable extends Migration
{

    public function up()
    {
        Schema::create('macrobit_bring_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');

            // Relations
            $table->integer('shop_id')->unsigned()->nullable();

            // NestedTree support
            $table->integer('parent_id')->nullable();
            $table->integer('nest_left')->nullable();
            $table->integer('nest_right')->nullable();
            $table->integer('nest_depth')->nullable();
            // Timestamps
            $table->timestamps();
        });

        Schema::create('macrobit_bring_categories_goods_tags', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('category_id')->unsigned()->nullable();
            $table->integer('tag_id')->unsigned()->nullable();
            $table->primary(['category_id', 'tag_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('macrobit_bring_categories');
        Schema::dropIfExists('macrobit_bring_categories_goods_tags');
    }

}
