<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Departement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartementController extends Controller
{
    /**
     * Lister tous les départements.
     */
    public function index()
    {
        return response()->json(Departement::all(), 200);
    }

    /**
     * Enregistrer un nouveau département.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50|unique:departements,nom',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $departement = Departement::create([
            'nom' => $request->nom,
        ]);

        return response()->json($departement, 201);
    }

    /**
     * Afficher un département spécifique.
     */
    public function show(string $id)
    {
        $departement = Departement::find($id);

        if (!$departement) {
            return response()->json(['message' => 'Département non trouvé'], 404);
        }

        return response()->json($departement);
    }

    /**
     * Mettre à jour un département.
     */
    public function update(Request $request, string $id)
    {
        $departement = Departement::find($id);

        if (!$departement) {
            return response()->json(['message' => 'Département non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50|unique:departements,nom,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $departement->update([
            'nom' => $request->nom,
        ]);

        return response()->json($departement);
    }

    /**
     * Supprimer un département.
     */
    public function destroy(string $id)
    {
        $departement = Departement::find($id);

        if (!$departement) {
            return response()->json(['message' => 'Département non trouvé'], 404);
        }

        $departement->delete();

        return response()->json(['message' => 'Département supprimé avec succès']);
    }
}
