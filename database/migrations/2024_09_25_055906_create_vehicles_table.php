<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('policy_id')->constrained()->onDelete('cascade');
            $table->integer('year');
            $table->string('make');
            $table->string('model');
            $table->string('vin');
            $table->string('usage');
            $table->string('primary_use');
            $table->integer('annual_mileage');
            $table->string('ownership');
            $table->string('garaging_street');
            $table->string('garaging_city');
            $table->string('garaging_state');
            $table->string('garaging_zip');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
