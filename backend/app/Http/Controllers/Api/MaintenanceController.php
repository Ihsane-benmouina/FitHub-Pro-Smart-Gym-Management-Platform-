<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Maintenance;
use App\Models\Equipment;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        return response()->json(
            Maintenance::with(['equipment', 'reporter'])
                ->latest()
                ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'description' => 'required|string',
            'type' => 'required|in:preventive,corrective',
            'scheduled_date' => 'nullable|date',
        ]);

        $maintenance = Maintenance::create([
            'equipment_id' => $request->equipment_id,
            'reported_by' => $request->user()->id,
            'description' => $request->description,
            'type' => $request->type,
            'status' => 'pending',
            'scheduled_date' => $request->scheduled_date,
        ]);

        Equipment::where('id', $request->equipment_id)
            ->update([
                'status' => 'maintenance'
            ]);

        return response()->json([
            'message' => 'Maintenance créée avec succès',
            'maintenance' => $maintenance
        ], 201);
    }

    public function complete(Request $request, $id)
    {
        $maintenance = Maintenance::find($id);

        if (!$maintenance) {
            return response()->json([
                'message' => 'Maintenance introuvable'
            ], 404);
        }

        $request->validate([
            'cost' => 'nullable|numeric|min:0',
        ]);

        $maintenance->update([
            'status' => 'completed',
            'completed_date' => now()->toDateString(),
            'cost' => $request->cost,
        ]);

        $maintenance->equipment->update([
            'status' => 'available'
        ]);

        return response()->json([
            'message' => 'Maintenance terminée avec succès',
            'maintenance' => $maintenance
        ]);
    }
}