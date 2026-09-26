<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,card,transfer',
            'reference' => 'nullable|string|max:255',
        ]);

        $payment = Payment::create([
            'subscription_id' => $request->subscription_id,
            'received_by' => $request->user()->id,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'reference' => $request->reference,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        return response()->json([
            'message' => 'Paiement enregistré avec succès',
            'payment' => $payment
        ], 201);
    }

    public function myPayments(Request $request)
    {
        $payments = Payment::with('subscription.plan')
        ->whereHas('subscription', function ($query) use ($request) {
            $query->where('member_id', $request->user()->id);
        })
        ->latest()
        ->get();

        return response()->json($payments);
    }
}