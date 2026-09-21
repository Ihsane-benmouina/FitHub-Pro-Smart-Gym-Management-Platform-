<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'name',
    'description',
    'image',
    'duration_minutes',
    'capacity',
    'is_active',
])]

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
