<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
#[Fillable([
    'coach_id',
    'day_of_week',
    'start_time',
    'end_time',
    'is_available',
])]
class CoachAvailability extends Model
{
    //
    public function coach()
{
    return $this->belongsTo(User::class, 'coach_id');
}
}
