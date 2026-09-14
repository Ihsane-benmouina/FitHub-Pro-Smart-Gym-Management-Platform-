<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    // Réceptionniste : enregistrer l'entrée d'un adhérent
    public function checkIn(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:users,id',
        ]);

        $member = User::find($request->member_id);

        if ($member->role !== 'adherent') {
            return response()->json([
                'message' => 'Cet utilisateur n\'est pas un adhérent'
            ], 400);
        }

        $alreadyInside = Attendance::where('member_id', $member->id)
            ->whereNull('check_out_at')
            ->first();

        if ($alreadyInside) {
            return response()->json([
                'message' => 'Cet adhérent est déjà dans la salle'
            ], 400);
        }

        $attendance = Attendance::create([
            'member_id' => $member->id,
            'checked_in_by' => $request->user()->id,
            'check_in_at' => now(),
            'method' => 'qr_code',
        ]);

        return response()->json([
            'message' => 'Entrée enregistrée avec succès',
            'attendance' => $attendance
        ], 201);
    }

    // Réceptionniste : enregistrer la sortie
    public function checkOut(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:users,id',
        ]);

        $attendance = Attendance::where('member_id', $request->member_id)
            ->whereNull('check_out_at')
            ->latest('check_in_at')
            ->first();

        if (!$attendance) {
            return response()->json([
                'message' => 'Aucune entrée active trouvée'
            ], 404);
        }

        $attendance->update([
            'check_out_at' => now()
        ]);

        return response()->json([
            'message' => 'Sortie enregistrée avec succès',
            'attendance' => $attendance
        ]);
    }

    // Adhérent : consulter son historique
    public function myHistory(Request $request)
    {
        $attendances = Attendance::where('member_id', $request->user()->id)
            ->latest('check_in_at')
            ->get();

        return response()->json($attendances);
    }
}