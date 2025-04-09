<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    // Relation avec les professeurs
    public function professeurs()
    {
        return $this->hasMany(Professeur::class, 'id_grade');
    }
}
