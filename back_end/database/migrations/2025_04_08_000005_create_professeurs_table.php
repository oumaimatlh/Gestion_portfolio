<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('professeurs', function (Blueprint $table) {
            $table->id(); 

            $table->string('nom', 20);
            $table->string('prenom', 20);

            $table->string('email',191)->unique();

            $table->string('telephone');

            $table->char('code_authentification',5)->unique();

            $table->string('mot_de_passe');

            $table->string('scopus')->nullable();
            $table->string('orcid')->nullable();
            $table->string('scholar')->nullable();

            $table->binary('photo')->nullable();
            $table->timestamps();


            $table->foreignId('id_administrateur')->references('id')->on('administrateurs')->onDelete('cascade');
            $table->foreignId('id_equipe')->references('id')->on('equipes')->onDelete('cascade');
            $table->foreignId('id_grade')->references('id')->on('grades')->onDelete('cascade');


        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('professeurs');
    }
};
