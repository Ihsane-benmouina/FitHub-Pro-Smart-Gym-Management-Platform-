<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
      'subscription_id',
    'received_by',
    'amount',
    'payment_method',
    'status',
    'paid_at',
    'reference',
])]

class Payment extends Model
{
    //
    public function subscription()
{
    return $this->belongsTo(Subscription::class);
}

public function receiver()
{
    return $this->belongsTo(User::class, 'received_by');
}
}
