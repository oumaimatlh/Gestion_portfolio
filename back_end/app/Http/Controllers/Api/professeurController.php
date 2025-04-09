<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfesseurController extends Controller
{
    /**
     * Lister tous les professeurs.
     */
    public function index()
    {
        return response()->json(Professeur::with(['administrateur', 'equipe', 'grade'])->get(), 200);
    }

    /**
     * Ajouter un nouveau professeur.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:20',
            'prenom' => 'required|string|max:20',
            'email' => 'required|email|unique:professeurs,email',
            'telephone' => 'required|string',
            'code_authentification' => 'required|string|size:5|unique:professeurs,code_authentification',
            'mot_de_passe' => 'required|string',
            'scopus' => 'nullable|string',
            'orcid' => 'nullable|string',
            'scholar' => 'nullable|string',
            'photo' => 'nullable',
            'id_administrateur' => 'required|exists:administrateurs,id',
            'id_equipe' => 'required|exists:equipes,id',
            'id_grade' => 'required|exists:grades,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $professeur = Professeur::create($request->all());

        return response()->json($professeur, 201);
    }

    /**
     * Afficher un professeur par ID.
     */
    public function show(string $id)
    {
        $professeur = Professeur::with(['administrateur', 'equipe', 'grade'])->find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        return response()->json($professeur);
    }

    /**
     * Mettre à jour un professeur.
     */
    public function update(Request $request, string $id)
    {
        $professeur = Professeur::find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|string|max:20',
            'prenom' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|unique:professeurs,email,' . $id,
            'telephone' => 'sometimes|string',
            'code_authentification' => 'sometimes|string|size:5|unique:professeurs,code_authentification,' . $id,
            'mot_de_passe' => 'sometimes|string',
            'scopus' => 'nullable|string',
            'orcid' => 'nullable|string',
            'scholar' => 'nullable|string',
            'photo' => 'nullable',
            'id_administrateur' => 'sometimes|exists:administrateurs,id',
            'id_equipe' => 'sometimes|exists:equipes,id',
            'id_grade' => 'sometimes|exists:grades,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $professeur->update($request->all());

        return response()->json($professeur);
    }

    /**
     * Supprimer un professeur.
     */
    public function destroy(string $id)
    {
        $professeur = Professeur::find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        $professeur->delete();

        return response()->json(['message' => 'Professeur supprimé avec succès']);
    }
}
