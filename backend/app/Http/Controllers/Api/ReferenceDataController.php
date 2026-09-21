<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Activity;
use App\Models\Equipment;
use App\Models\Subscription;

class ReferenceDataController extends Controller
{
    public function coaches()
    {
        return response()->json(
            User::where('role', 'coach')
                ->where('is_active', true)
                ->select('id', 'name')
                ->get()
        );
    }

    public function members()
    {
        return response()->json(
            User::where('role', 'adherent')
                ->where('is_active', true)
                ->select('id', 'name')
                ->get()
        );
    }

  public function activities()
{
    return response()->json(
        Activity::with('coaches')
            ->where('is_active', true)
            ->get()
    );
}

    public function equipment()
    {
        return response()->json(
            Equipment::select('id', 'name', 'serial_number')
                ->get()
        );
    }

    public function subscriptions()
{
    return response()->json(
        Subscription::with(['member', 'plan'])
            ->whereIn('status', ['active', 'pending'])
            ->latest()
            ->get()
    );
}
}