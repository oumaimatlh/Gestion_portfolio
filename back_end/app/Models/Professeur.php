<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom', 'prenom', 'email', 'telephone', 'code_authentification', 'mot_de_passe',
        'scopus', 'orcid', 'scholar', 'photo',
        'id_administrateur', 'id_equipe', 'id_grade'
    ];
    

    // Relation avec les publications
    public function publications()
    {
        return $this->hasMany(Publication::class, 'professeur_id');
    }

    // Relation avec les administrateurs
    public function administrateur()
    {
        return $this->belongsTo(Administrateur::class, 'id_administrateur');
    }

    // Relation avec les équipes
    public function equipe()
    {
        return $this->belongsTo(Equipe::class, 'id_equipe');
    }

    // Relation avec les grades
    public function grade()
    {
        return $this->belongsTo(Grade::class, 'id_grade');
    }
}

