<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CoachAvailability;
use Illuminate\Http\Request;

class CoachAvailabilityController extends Controller
{
    public function index(Request $request)
    {
        $availabilities = CoachAvailability::where('coach_id', $request->user()->id)
            ->get();

        return response()->json($availabilities);
    }

    public function store(Request $request)
    {
        $request->validate([
            'day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
        ]);

        $availability = CoachAvailability::create([
            'coach_id' => $request->user()->id,
            'day_of_week' => $request->day_of_week,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_available' => true,
        ]);

        return response()->json([
            'message' => 'Disponibilité ajoutée avec succès',
            'availability' => $availability
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $availability = CoachAvailability::where('id', $id)
            ->where('coach_id', $request->user()->id)
            ->first();

        if (!$availability) {
            return response()->json([
                'message' => 'Disponibilité introuvable'
            ], 404);
        }

        $availability->delete();

        return response()->json([
            'message' => 'Disponibilité supprimée avec succès'
        ]);
    }
}