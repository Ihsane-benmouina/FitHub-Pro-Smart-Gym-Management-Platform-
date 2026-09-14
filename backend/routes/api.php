<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\CoachAvailabilityController;



Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);

    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/me', [AuthController::class, 'me']);

        Route::post('/logout', [AuthController::class, 'logout']);

    });

});

Route::middleware(['auth:sanctum', 'check.role:admin'])->get('/admin/test', function () {
    return response()->json([
        'message' => 'Bienvenue Admin'
    ]);
});

Route::post('/auth/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [PasswordResetController::class, 'resetPassword']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/profile', [ProfileController::class, 'show']);

    Route::put('/profile', [ProfileController::class, 'update']);

});

Route::middleware(['auth:sanctum', 'check.role:coach'])->group(function () {

    Route::get('/coach/availabilities', [CoachAvailabilityController::class, 'index']);

    Route::post('/coach/availabilities', [CoachAvailabilityController::class, 'store']);

    Route::delete('/coach/availabilities/{id}', [CoachAvailabilityController::class, 'destroy']);

});