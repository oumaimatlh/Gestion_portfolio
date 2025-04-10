<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicationController extends Controller
{
    /**
     * Lister toutes les publications.
     */
    public function index()
    {
        return response()->json(Publication::with('professeur')->get(), 200);
    }

    /**
     * Créer une nouvelle publication.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'titre' => 'required|string',
        'contenu' => 'required|string',
        'date_publication' => 'required|date',
        'professeur_id' => 'required|exists:professeurs,id',
    ]);

    $publication = Publication::create($validated);
    return response()->json($publication, 201);
}


    /**
     * Afficher une publication spécifique.
     */
    public function show($id)
    {
        $publication = Publication::with('professeur')->find($id);

        if (!$publication) {
            return response()->json(['message' => 'Publication non trouvée'], 404);
        }

        return response()->json($publication);
    }

    /**
     * Mettre à jour une publication.
     */
    public function update(Request $request, $id)
    {
        $publication = Publication::find($id);

        if (!$publication) {
            return response()->json(['message' => 'Publication non trouvée'], 404);
        }

        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|string|max:255',
            'contenu' => 'sometimes|string',
            'date_publication' => 'sometimes|date',
            'professeur_id' => 'sometimes|exists:professeurs,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $publication->update($request->all());

        return response()->json($publication);
    }

    /**
     * Supprimer une publication.
     */
    public function destroy($id)
    {
        $publication = Publication::find($id);

        if (!$publication) {
            return response()->json(['message' => 'Publication non trouvée'], 404);
        }

        $publication->delete();

        return response()->json(['message' => 'Publication supprimée avec succès']);
    }
}
