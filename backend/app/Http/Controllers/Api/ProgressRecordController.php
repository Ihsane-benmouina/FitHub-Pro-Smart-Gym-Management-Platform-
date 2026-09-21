<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgressRecord;
use App\Models\User;
use Illuminate\Http\Request;

class ProgressRecordController extends Controller
{
    // Coach ajoute une progression pour un adhérent
    public function store(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:users,id',
            'weight' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'body_fat_percentage' => 'nullable|numeric|min:0',
            'muscle_mass' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $member = User::findOrFail($request->member_id);

        if ($member->role !== 'adherent') {
            return response()->json([
                'message' => 'Utilisateur invalide'
            ], 422);
        }

        $progress = ProgressRecord::create([
            'member_id' => $member->id,
            'coach_id' => $request->user()->id,
            'recorded_at' => now(),
            'weight' => $request->weight,
            'height' => $request->height,
            'body_fat_percentage' => $request->body_fat_percentage,
            'muscle_mass' => $request->muscle_mass,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => 'Progression enregistrée avec succès',
            'progress' => $progress,
        ], 201);
    }

    // Coach consulte les progressions d'un adhérent
    public function memberHistory($memberId)
    {
        $progress = ProgressRecord::with('member')
            ->where('member_id', $memberId)
            ->latest('recorded_at')
            ->get();

        return response()->json($progress);
    }

    // Adhérent consulte sa propre progression
    public function myProgress(Request $request)
    {
        $progress = ProgressRecord::with('coach')
            ->where('member_id', $request->user()->id)
            ->latest('recorded_at')
            ->get();

        return response()->json($progress);
    }
}