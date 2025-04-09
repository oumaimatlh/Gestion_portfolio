<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    // Relation avec les laboratoires
    public function laboratoires()
    {
        return $this->hasMany(Laboratoire::class, 'id_departement');
    }
}
