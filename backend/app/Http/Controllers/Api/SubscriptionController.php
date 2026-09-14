<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'subscription_plan_id' => 'required|exists:subscription_plans,id',
        ]);

        $plan = SubscriptionPlan::find($request->subscription_plan_id);

        $subscription = Subscription::create([
            'member_id' => $request->user()->id,
            'subscription_plan_id' => $plan->id,
            'start_date' => now()->toDateString(),
            'end_date' => now()->addDays($plan->duration_days)->toDateString(),
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Abonnement créé avec succès',
            'subscription' => $subscription
        ], 201);
    }

    public function mySubscription(Request $request)
    {
        $subscription = Subscription::with('plan')
            ->where('member_id', $request->user()->id)
            ->latest()
            ->first();

        return response()->json([
            'subscription' => $subscription
        ]);
    }
}