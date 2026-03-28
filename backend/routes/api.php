<?php

use App\Http\Controllers\ArtigosEsportivosController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use Illuminate\Database\Schema\IndexDefinition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::get('/category', [CategoryController::class, 'index']);
Route::post('/category', [CategoryController::class, 'store']);
Route::get('/category/{id}', [CategoryController::class, 'show']);
Route::put('/category/{id}', [CategoryController::class, 'update']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

Route::get('/artigosEsportivos', [ArtigosEsportivosController::class, 'index']);
Route::post('/artigosEsportivos', [ArtigosEsportivosController::class, 'store']);
Route::get('/artigosEsportivos/{id}', [ArtigosEsportivosController::class, 'show']);
Route::put('/artigosEsportivos/{id}', [ArtigosEsportivosController::class, 'update']);
Route::delete('/artigosEsportivos/{id}', [ArtigosEsportivosController::class, 'destroy']);

//Route::apiResource('/artigosEsportivos', ArtigosEsportivosController::class);

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    //Route::apiResource('/category', CategoryController::class)->except(['index', 'show']);
    //Route::apiResource('/artigosEsportivos', ArtigosEsportivosController::class)->except(['index', 'show']);
});

//Route::get('/artigosEsportivos', [ArtigosEsportivosController::class, 'index']);
//Route::get('/artigosEsportivos/{id}', [ArtigosEsportivosController::class, 'show']);
Route::patch('/artigosEsportivos/{id}', [ArtigosEsportivosController::class, 'decrementQTD']);


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
