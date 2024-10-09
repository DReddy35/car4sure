<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\CoverageController;
use App\Http\Controllers\PolicyholderController;
use App\Http\Controllers\AuthController;

use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('policies')->group(function () {
    Route::get('/', [PolicyController::class, 'index']);       // Get all policies
    Route::post('/', [PolicyController::class, 'store']);      // Create a new policy
    Route::get('/{id}', [PolicyController::class, 'show']);    // Show a specific policy
    Route::put('/{id}', [PolicyController::class, 'update']);  // Update a specific policy
    Route::delete('/{id}', [PolicyController::class, 'destroy']); // Delete a specific policy
    Route::get('/{id}/pdf', [PolicyController::class, 'generatePDF']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});

