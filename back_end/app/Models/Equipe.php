<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    use HasFactory;

    // Relation avec les laboratoires
    public function laboratoire()
    {
        return $this->belongsTo(Laboratoire::class, 'id_laboratoire');
    }
}
