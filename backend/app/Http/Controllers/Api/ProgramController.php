<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'goal' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $program = Program::create([
            'coach_id' => $request->user()->id,
            'member_id' => $request->member_id,
            'title' => $request->title,
            'description' => $request->description,
            'goal' => $request->goal,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Programme créé avec succès',
            'program' => $program
        ], 201);
    }

    public function coachPrograms(Request $request)
    {
        $programs = Program::with(['member', 'exercises'])
            ->where('coach_id', $request->user()->id)
            ->get();

        return response()->json($programs);
    }

    public function myPrograms(Request $request)
    {
        $programs = Program::with(['coach', 'exercises'])
            ->where('member_id', $request->user()->id)
            ->get();

        return response()->json($programs);
    }

    public function update(Request $request, $id)
    {
        $program = Program::where('id', $id)
            ->where('coach_id', $request->user()->id)
            ->first();

        if (!$program) {
            return response()->json([
                'message' => 'Programme introuvable'
            ], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'goal' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,completed,cancelled',
        ]);

        $program->update([
            'title' => $request->title,
            'description' => $request->description,
            'goal' => $request->goal,
            'status' => $request->status ?? $program->status,
        ]);

        return response()->json([
            'message' => 'Programme modifié avec succès',
            'program' => $program
        ]);
    }

    public function addExercise(Request $request, $id)
    {
        $program = Program::where('id', $id)
            ->where('coach_id', $request->user()->id)
            ->first();

        if (!$program) {
            return response()->json([
                'message' => 'Programme introuvable'
            ], 404);
        }

        $request->validate([
            'exercise_id' => 'required|exists:exercises,id',
            'sets' => 'nullable|integer|min:1',
            'reps' => 'nullable|integer|min:1',
            'weight' => 'nullable|numeric|min:0',
            'rest_seconds' => 'nullable|integer|min:0',
        ]);

        $program->exercises()->syncWithoutDetaching([
            $request->exercise_id => [
                'sets' => $request->sets,
                'reps' => $request->reps,
                'weight' => $request->weight,
                'rest_seconds' => $request->rest_seconds,
            ]
        ]);

        return response()->json([
            'message' => 'Exercice ajouté au programme'
        ]);
    }
}