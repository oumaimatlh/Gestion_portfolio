<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->longText('contenu'); // Pour contenu riche (style Word)
            $table->date('date_publication');
            
            $table->foreignId('professeur_id')->constrained('professeurs')->onDelete('cascade');
            $table->timestamps();
        });
    }

 
    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
