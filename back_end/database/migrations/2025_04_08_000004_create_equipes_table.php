<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    {
        Schema::create('equipes', function (Blueprint $table) {
            $table->id();
            $table->string('nom',50);

            $table->timestamps();

            $table->foreignId('id_laboratoire')->references('id')->on('laboratoires')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipes');
    }
};
