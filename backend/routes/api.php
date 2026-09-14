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
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\MaintenanceController;
use App\Http\Controllers\Api\AttendanceController;


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


Route::middleware(['auth:sanctum', 'check.role:coach'])->group(function () {

    Route::get('/exercises', [ExerciseController::class, 'index']);
    Route::post('/exercises', [ExerciseController::class, 'store']);

    Route::post('/programs', [ProgramController::class, 'store']);
    Route::get('/coach/programs', [ProgramController::class, 'coachPrograms']);
    Route::put('/programs/{id}', [ProgramController::class, 'update']);

    Route::post('/programs/{id}/exercises', [ProgramController::class, 'addExercise']);
});

Route::middleware(['auth:sanctum', 'check.role:adherent'])->group(function () {

    Route::get('/my-programs', [ProgramController::class, 'myPrograms']);

});

Route::middleware(['auth:sanctum', 'check.role:admin'])->group(function () {

    Route::get('/equipment', [EquipmentController::class, 'index']);
    Route::post('/equipment', [EquipmentController::class, 'store']);
    Route::put('/equipment/{id}', [EquipmentController::class, 'update']);
    Route::delete('/equipment/{id}', [EquipmentController::class, 'destroy']);

    Route::get('/maintenances', [MaintenanceController::class, 'index']);
    Route::post('/maintenances', [MaintenanceController::class, 'store']);
    Route::put('/maintenances/{id}/complete', [MaintenanceController::class, 'complete']);

});
Route::middleware(['auth:sanctum', 'check.role:receptionniste,admin'])->group(function () {

    Route::post('/attendance/check-in', [AttendanceController::class, 'checkIn']);

    Route::post('/attendance/check-out', [AttendanceController::class, 'checkOut']);

});

Route::middleware(['auth:sanctum', 'check.role:adherent'])->group(function () {

    Route::get('/my-attendances', [AttendanceController::class, 'myHistory']);

}); 
