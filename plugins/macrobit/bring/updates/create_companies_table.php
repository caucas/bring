<?php namespace Macrobit\Bring\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateCompaniesTable extends Migration
{

    public function up()
    {
        Schema::create('macrobit_bring_companies', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->string('url')->nullable();
            $table->timestamps();
        });

        Schema::table('backend_users', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('company_id')->unsigned()->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('macrobit_bring_companies');
        if (Schema::hasColumn('backend_users', 'company_id')) {
            Schema::table('backend_users', function($table){
                $table->dropColumn('company_id');
            });
        }
    }

}
