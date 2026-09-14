<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index()
    {
        return response()->json(Equipment::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'nullable|string|unique:equipment,serial_number',
            'category' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'status' => 'required|in:available,in_use,maintenance,out_of_service',
            'location' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $equipment = Equipment::create($request->only([
            'name',
            'serial_number',
            'category',
            'purchase_date',
            'status',
            'location',
            'notes',
        ]));

        return response()->json([
            'message' => 'Équipement ajouté avec succès',
            'equipment' => $equipment
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $equipment = Equipment::find($id);

        if (!$equipment) {
            return response()->json([
                'message' => 'Équipement introuvable'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'status' => 'required|in:available,in_use,maintenance,out_of_service',
            'location' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $equipment->update($request->only([
            'name',
            'category',
            'status',
            'location',
            'notes',
        ]));

        return response()->json([
            'message' => 'Équipement modifié avec succès',
            'equipment' => $equipment
        ]);
    }

    public function destroy($id)
    {
        $equipment = Equipment::find($id);

        if (!$equipment) {
            return response()->json([
                'message' => 'Équipement introuvable'
            ], 404);
        }

        $equipment->delete();

        return response()->json([
            'message' => 'Équipement supprimé avec succès'
        ]);
    }
}