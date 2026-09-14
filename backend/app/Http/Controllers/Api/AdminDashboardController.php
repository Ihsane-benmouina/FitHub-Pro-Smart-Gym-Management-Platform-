<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Subscription;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Equipment;
use App\Models\Attendance;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalMembers = User::where('role', 'adherent')->count();

        $totalCoaches = User::where('role', 'coach')->count();

        $activeSubscriptions = Subscription::where('status', 'active')
            ->whereDate('end_date', '>=', today())
            ->count();

        $totalRevenue = Payment::where('status', 'paid')
            ->sum('amount');

        $totalReservations = Reservation::count();

        $totalEquipment = Equipment::count();

        $equipmentInMaintenance = Equipment::where('status', 'maintenance')
            ->count();

        $todayAttendances = Attendance::whereDate('check_in_at', today())
            ->count();

        return response()->json([
            'total_members' => $totalMembers,
            'total_coaches' => $totalCoaches,
            'active_subscriptions' => $activeSubscriptions,
            'total_revenue' => $totalRevenue,
            'total_reservations' => $totalReservations,
            'total_equipment' => $totalEquipment,
            'equipment_in_maintenance' => $equipmentInMaintenance,
            'today_attendances' => $todayAttendances,
        ]);
    }
}