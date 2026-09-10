<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
