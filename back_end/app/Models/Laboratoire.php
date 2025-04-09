<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laboratoire extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'id_departement'];


    // Relation avec les départements
    public function departement()
    {
        return $this->belongsTo(Departement::class, 'id_departement');
    }

    // Relation avec les équipes
    public function equipes()
    {
        return $this->hasMany(Equipe::class, 'id_laboratoire');
    }
}
