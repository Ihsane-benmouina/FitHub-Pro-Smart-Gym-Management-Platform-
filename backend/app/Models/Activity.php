<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    //
    public function coaches()
{
    return $this->belongsToMany(User::class, 'activity_coach', 'activity_id', 'coach_id')
        ->withTimestamps();
}

public function reservations()
{
    return $this->hasMany(Reservation::class);
}
}
