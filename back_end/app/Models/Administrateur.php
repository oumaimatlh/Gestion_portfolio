<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrateur extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'prenom', 'email', 'mot_de_passe'];
    protected $hidden = ['mot_de_passe'];


    // Relation avec les professeurs
    public function professeurs()
    {
        return $this->hasMany(Professeur::class);
    }
}
