<?php namespace Macrobit\Bring\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateShopsTable extends Migration
{

    public function up()
    {
        Schema::create('macrobit_bring_shops', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('address');
            $table->string('description');
            $table->string('deliveryDescription');
            $table->integer('minDeliverySumm')->nullable();
            $table->integer('deliveryPrice')->nullable();
            $table->string('tel')->nullable();
            $table->string('schedule')->default('{}');
            $table->boolean('hidePrices')->default(false);
            // Relations
            $table->integer('region_id')->unsigned()->nullable();
            $table->integer('company_id')->unsigned()->nullable();
            // Timestamps
            $table->timestamps();
        });

        Schema::table('backend_users', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('shop_id')->unsigned()->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('macrobit_bring_shops');
        if (Schema::hasColumn('backend_users', 'shop_id')) {
            Schema::table('backend_users', function($table){
                $table->dropColumn('shop_id');
            });
        }
    }

}
