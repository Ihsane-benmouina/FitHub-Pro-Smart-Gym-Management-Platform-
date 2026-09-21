<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    // Liste des activités
    public function index()
    {
        return response()->json(
            Activity::with('coaches')->latest()->get()
        );
    }

    // Créer une activité
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:activities,name',
            'description' => 'nullable|string',
            'duration_minutes' => 'nullable|integer|min:1',
            'capacity' => 'nullable|integer|min:1',
        ]);

        $activity = Activity::create([
            'name' => $request->name,
            'description' => $request->description,
            'duration_minutes' => $request->duration_minutes,
            'capacity' => $request->capacity,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Activité créée avec succès',
            'activity' => $activity,
        ], 201);
    }

    // Modifier une activité
    public function update(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:activities,name,' . $id,
            'description' => 'nullable|string',
            'duration_minutes' => 'nullable|integer|min:1',
            'capacity' => 'nullable|integer|min:1',
            'is_active' => 'required|boolean',
        ]);

        $activity->update($request->only([
            'name',
            'description',
            'duration_minutes',
            'capacity',
            'is_active',
        ]));

        return response()->json([
            'message' => 'Activité modifiée avec succès',
            'activity' => $activity,
        ]);
    }

    // Supprimer une activité
    public function destroy($id)
    {
        $activity = Activity::findOrFail($id);

        $activity->delete();

        return response()->json([
            'message' => 'Activité supprimée avec succès'
        ]);
    }

    // Associer un coach
    public function assignCoach(Request $request, $id)
    {
        $request->validate([
            'coach_id' => 'required|exists:users,id',
        ]);

        $coach = User::findOrFail($request->coach_id);

        if ($coach->role !== 'coach') {
            return response()->json([
                'message' => 'Utilisateur invalide'
            ], 422);
        }

        $activity = Activity::findOrFail($id);

        $activity->coaches()->syncWithoutDetaching([
            $coach->id
        ]);

        return response()->json([
            'message' => 'Coach associé avec succès'
        ]);
    }

    // Retirer un coach
    public function removeCoach($id, $coachId)
    {
        $activity = Activity::findOrFail($id);

        $activity->coaches()->detach($coachId);

        return response()->json([
            'message' => 'Coach retiré avec succès'
        ]);
    }
}