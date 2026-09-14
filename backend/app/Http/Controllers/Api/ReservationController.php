<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'coach_id' => 'required|exists:users,id',
            'activity_id' => 'required|exists:activities,id',
            'session_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
        ]);

        $reservation = Reservation::create([
            'member_id' => $request->user()->id,
            'coach_id' => $request->coach_id,
            'activity_id' => $request->activity_id,
            'session_date' => $request->session_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Réservation créée avec succès',
            'reservation' => $reservation
        ], 201);
    }

    public function myReservations(Request $request)
    {
        $reservations = Reservation::with(['coach', 'activity'])
            ->where('member_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($reservations);
    }

    public function coachReservations(Request $request)
    {
        $reservations = Reservation::with(['member', 'activity'])
            ->where('coach_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($reservations);
    }

    public function accept(Request $request, $id)
    {
        $reservation = Reservation::where('id', $id)
            ->where('coach_id', $request->user()->id)
            ->first();

        if (!$reservation) {
            return response()->json([
                'message' => 'Réservation introuvable'
            ], 404);
        }

        $reservation->update([
            'status' => 'accepted'
        ]);

        return response()->json([
            'message' => 'Réservation acceptée'
        ]);
    }

    public function reject(Request $request, $id)
    {
        $reservation = Reservation::where('id', $id)
            ->where('coach_id', $request->user()->id)
            ->first();

        if (!$reservation) {
            return response()->json([
                'message' => 'Réservation introuvable'
            ], 404);
        }

        $reservation->update([
            'status' => 'rejected'
        ]);

        return response()->json([
            'message' => 'Réservation refusée'
        ]);
    }
}