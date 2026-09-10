<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    //
    public function member()
{
    return $this->belongsTo(User::class, 'member_id');
}

public function plan()
{
    return $this->belongsTo(SubscriptionPlan::class, 'subscription_plan_id');
}

public function payments()
{
    return $this->hasMany(Payment::class);
}
}
