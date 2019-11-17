<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ImagesTableAddDimensionsFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('images', function (Blueprint $table) {
            $table
                ->integer('image_id')
                ->unsigned()
                ->default(0);
            $table
                ->integer('width')
                ->unsigned()
                ->default(0);
            $table
                ->integer('height')
                ->unsigned()
                ->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->dropColumn('image_id');
            $table->dropColumn('width');
            $table->dropColumn('height');
        });
    }
}
