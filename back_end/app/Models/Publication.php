<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;
    protected $fillable = [
        'titre', 'contenu', 'date_publication', 'professeur_id'
    ];

    // Relation avec les professeurs
    public function professeur()
    {
        return $this->belongsTo(Professeur::class, 'professeur_id');
    }
}
