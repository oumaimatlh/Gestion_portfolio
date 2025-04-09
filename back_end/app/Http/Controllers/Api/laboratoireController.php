<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Laboratoire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LaboratoireController extends Controller
{
    /**
     * Lister tous les laboratoires.
     */
    public function index()
    {
        return response()->json(Laboratoire::with('departement')->get(), 200);
    }

    /**
     * Enregistrer un nouveau laboratoire.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50|unique:laboratoires,nom',
            'id_departement' => 'required|exists:departements,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $laboratoire = Laboratoire::create([
            'nom' => $request->nom,
            'id_departement' => $request->id_departement,
        ]);

        return response()->json($laboratoire, 201);
    }

    /**
     * Afficher un laboratoire spécifique.
     */
    public function show(string $id)
    {
        $laboratoire = Laboratoire::with('departement', 'equipes')->find($id);

        if (!$laboratoire) {
            return response()->json(['message' => 'Laboratoire non trouvé'], 404);
        }

        return response()->json($laboratoire);
    }

    /**
     * Mettre à jour un laboratoire.
     */
    public function update(Request $request, string $id)
    {
        $laboratoire = Laboratoire::find($id);

        if (!$laboratoire) {
            return response()->json(['message' => 'Laboratoire non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'string|max:50|unique:laboratoires,nom,' . $id,
            'id_departement' => 'exists:departements,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $laboratoire->update([
            'nom' => $request->nom ?? $laboratoire->nom,
            'id_departement' => $request->id_departement ?? $laboratoire->id_departement,
        ]);

        return response()->json($laboratoire);
    }

    /**
     * Supprimer un laboratoire.
     */
    public function destroy(string $id)
    {
        $laboratoire = Laboratoire::find($id);

        if (!$laboratoire) {
            return response()->json(['message' => 'Laboratoire non trouvé'], 404);
        }

        $laboratoire->delete();

        return response()->json(['message' => 'Laboratoire supprimé avec succès']);
    }
}
