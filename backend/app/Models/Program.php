<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    //
    public function coach()
{
    return $this->belongsTo(User::class, 'coach_id');
}

public function member()
{
    return $this->belongsTo(User::class, 'member_id');
}

public function exercises()
{
    return $this->belongsToMany(Exercise::class, 'program_exercise')
        ->withPivot([
            'sets',
            'reps',
            'duration_seconds',
            'weight',
            'rest_seconds',
            'instructions'
        ])
        ->withTimestamps();
}
}
