<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoachAvailability extends Model
{
    //
    public function coach()
{
    return $this->belongsTo(User::class, 'coach_id');
}
}
