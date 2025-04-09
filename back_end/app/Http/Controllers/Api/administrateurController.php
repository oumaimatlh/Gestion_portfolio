<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Administrateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdministrateurController extends Controller
{
    /**
     * Afficher la liste des administrateurs.
     */
    public function index()
    {
        return response()->json(Administrateur::all(), 200);
    }

    /**
     * Enregistrer un nouvel administrateur.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'string|max:20',
            'prenom' => 'string|max:20',
            'email' => 'email|unique:administrateurs,email',
            'mot_de_passe' => 'string|min:6',
        ]);

        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin = Administrateur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
        ]);

        return response()->json($admin, 201);
    }

    /**
     * Afficher un administrateur spécifique.
     */
    public function show(string $id)
    {
        $admin = Administrateur::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Administrateur non trouvé'], 404);
        }

        return response()->json($admin);
    }

    /**
     * Mettre à jour les infos d’un administrateur.
     */
    public function update(Request $request, string $id)
    {
        $admin = Administrateur::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Administrateur non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'string|max:20',
            'prenom' => 'string|max:20',
            'email' => 'email|unique:administrateurs,email,' . $id,
            'mot_de_passe' => 'nullable|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin->update([
            'nom' => $request->nom ?? $admin->nom,
            'prenom' => $request->prenom ?? $admin->prenom,
            'email' => $request->email ?? $admin->email,
            'mot_de_passe' => $request->mot_de_passe ? Hash::make($request->mot_de_passe) : $admin->mot_de_passe,
        ]);

        return response()->json($admin);
    }

    /**
     * Supprimer un administrateur.
     */
    public function destroy(string $id)
    {
        $admin = Administrateur::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Administrateur non trouvé'], 404);
        }

        $admin->delete();

        return response()->json(['message' => 'Administrateur supprimé avec succès']);
    }
}
