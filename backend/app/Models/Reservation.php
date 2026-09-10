<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
