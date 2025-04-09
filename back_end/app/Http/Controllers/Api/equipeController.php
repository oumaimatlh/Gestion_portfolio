<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipe;
use Illuminate\Http\Request;

class EquipeController extends Controller
{
    /**
     * Afficher toutes les équipes.
     */
    public function index()
    {
        $equipes = Equipe::with('laboratoire')->get();
        return response()->json($equipes);
    }

    /**
     * Créer une nouvelle équipe.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:50',
            'id_laboratoire' => 'required|exists:laboratoires,id',
        ]);

        $equipe = Equipe::create($validated);
        return response()->json($equipe, 201);
    }

    /**
     * Afficher une équipe spécifique.
     */
    public function show(string $id)
    {
        $equipe = Equipe::with('laboratoire')->findOrFail($id);
        return response()->json($equipe);
    }

    /**
     * Mettre à jour une équipe existante.
     */
    public function update(Request $request, string $id)
    {
        $equipe = Equipe::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:50',
            'id_laboratoire' => 'sometimes|required|exists:laboratoires,id',
        ]);

        $equipe->update($validated);
        return response()->json($equipe);
    }

    /**
     * Supprimer une équipe.
     */
    public function destroy(string $id)
    {
        $equipe = Equipe::findOrFail($id);
        $equipe->delete();

        return response()->json(['message' => 'Équipe supprimée avec succès.']);
    }
}
