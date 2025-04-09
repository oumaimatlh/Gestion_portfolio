<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GradeController extends Controller
{
    /**
     * Afficher la liste des grades.
     */
    public function index()
    {
        return response()->json(Grade::all(), 200);
    }

    /**
     * Enregistrer un nouveau grade.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50|unique:grades,nom',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $grade = Grade::create([
            'nom' => $request->nom,
        ]);

        return response()->json($grade, 201);
    }

    /**
     * Afficher un grade spécifique.
     */
    public function show(string $id)
    {
        $grade = Grade::find($id);

        if (!$grade) {
            return response()->json(['message' => 'Grade non trouvé'], 404);
        }

        return response()->json($grade);
    }

    /**
     * Mettre à jour un grade.
     */
    public function update(Request $request, string $id)
    {
        $grade = Grade::find($id);

        if (!$grade) {
            return response()->json(['message' => 'Grade non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50|unique:grades,nom,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $grade->update([
            'nom' => $request->nom,
        ]);

        return response()->json($grade);
    }

    /**
     * Supprimer un grade.
     */
    public function destroy(string $id)
    {
        $grade = Grade::find($id);

        if (!$grade) {
            return response()->json(['message' => 'Grade non trouvé'], 404);
        }

        $grade->delete();

        return response()->json(['message' => 'Grade supprimé avec succès']);
    }
}
