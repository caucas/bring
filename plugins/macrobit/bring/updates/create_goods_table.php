<?php namespace Macrobit\Bring\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateGoodsTable extends Migration
{

    public function up()
    {
        Schema::create('macrobit_bring_goods', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->integer('price')->nullable();
            $table->integer('stock')->nullable();
            $table->string('weight')->nullable();
            $table->string('rawId')->nullable();
            $table->string('attributes')->nullable();
            $table->integer('shop_id')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('macrobit_bring_goods');
    }

}
