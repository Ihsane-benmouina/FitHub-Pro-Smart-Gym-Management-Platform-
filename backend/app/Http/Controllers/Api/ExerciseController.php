<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function index()
    {
        return response()->json(Exercise::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'muscle_group' => 'nullable|string|max:255',
        ]);

        $exercise = Exercise::create([
            'name' => $request->name,
            'description' => $request->description,
            'muscle_group' => $request->muscle_group,
        ]);

        return response()->json([
            'message' => 'Exercice créé avec succès',
            'exercise' => $exercise
        ], 201);
    }
}