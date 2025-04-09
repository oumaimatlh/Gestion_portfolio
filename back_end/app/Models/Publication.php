<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    // Relation avec les professeurs
    public function professeur()
    {
        return $this->belongsTo(Professeur::class, 'professeur_id');
    }
}
