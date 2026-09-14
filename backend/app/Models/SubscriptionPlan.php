<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'name',
    'description',
    'price',
    'duration_days',
    'is_active',
])]

class SubscriptionPlan extends Model
{
    //
    public function subscriptions()
{
    return $this->hasMany(Subscription::class);
}
}
