<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'member_id',
    'coach_id',
    'recorded_at',
    'weight',
    'height',
    'body_fat_percentage',
    'muscle_mass',
    'notes',
])]

class ProgressRecord extends Model
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
}
