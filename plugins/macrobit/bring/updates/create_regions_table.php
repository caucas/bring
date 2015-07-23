<?php namespace Macrobit\Bring\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateRegionsTable extends Migration
{

    public function up()
    {
        Schema::create('macrobit_bring_regions', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('contacts');
            $table->integer('orderPriority')->nullable();
            $table->timestamps();
        });

        Schema::table('backend_users', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('region_id')->unsigned()->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('macrobit_bring_regions');
        if (Schema::hasColumn('backend_users', 'region_id')) {
            Schema::table('backend_users', function($table){
                $table->dropColumn('region_id');
            });
        }
    }

}
