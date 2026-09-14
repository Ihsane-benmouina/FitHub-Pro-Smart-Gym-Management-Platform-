<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'member_id',
    'coach_id',
    'activity_id',
    'session_date',
    'start_time',
    'end_time',
    'status',
    'notes',
])]

class Reservation extends Model
{
    //
    public function member()
{
    return $this->belongsTo(User::class, 'member_id');
}

public function coach()
{
    return $this->belongsTo(User::class, 'coach_id');
}

public function activity()
{
    return $this->belongsTo(Activity::class);
}
}
