<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\CoachAvailabilityController;

use App\Http\Controllers\Api\SubscriptionPlanController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReservationController;


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


Route::get('/subscription-plans', [SubscriptionPlanController::class, 'index']);

Route::middleware(['auth:sanctum', 'check.role:admin'])->group(function () {
    Route::post('/subscription-plans', [SubscriptionPlanController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'check.role:adherent'])->group(function () {
    Route::post('/subscriptions', [SubscriptionController::class, 'subscribe']);
    Route::get('/my-subscription', [SubscriptionController::class, 'mySubscription']);
});

Route::middleware(['auth:sanctum', 'check.role:adherent'])->group(function () {
    Route::post('/subscriptions', [SubscriptionController::class, 'subscribe']);
    Route::get('/my-subscription', [SubscriptionController::class, 'mySubscription']);
    Route::put('/subscriptions/{id}/renew', [SubscriptionController::class, 'renew']);
    Route::get('/my-payments', [PaymentController::class, 'myPayments']);
});

Route::middleware(['auth:sanctum', 'check.role:admin,receptionniste'])->group(function () {
    Route::post('/payments', [PaymentController::class, 'store']);
});


Route::middleware(['auth:sanctum', 'check.role:adherent'])->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/my-reservations', [ReservationController::class, 'myReservations']);
});

Route::middleware(['auth:sanctum', 'check.role:coach'])->group(function () {
    Route::get('/coach/reservations', [ReservationController::class, 'coachReservations']);
    Route::put('/reservations/{id}/accept', [ReservationController::class, 'accept']);
    Route::put('/reservations/{id}/reject', [ReservationController::class, 'reject']);
});