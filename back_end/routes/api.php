<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\Api\AdministrateurController;
use App\Http\Controllers\Api\PublicationController;
use App\Http\Controllers\Api\DepartementController;
use App\Http\Controllers\Api\GradeController;
use App\Http\Controllers\Api\LaboratoireController;
use App\Http\Controllers\Api\ProfesseurController;
use App\Http\Controllers\Api\EquipeController;


Route::apiResource('administrateurs', AdministrateurController::class);

Route::apiResource('departements', DepartementController::class);

Route::apiResource('grades', GradeController::class);

Route::apiResource('laboratoires', LaboratoireController::class);

Route::apiResource('equipes', EquipeController::class);

Route::apiResource('professeurs', ProfesseurController::class);

Route::apiResource('publications', PublicationController::class);