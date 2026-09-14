<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
      'name',
    'description',
    'muscle_group',
    'image',
    'video_url',

])]

class Exercise extends Model
{
    //
    public function programs()
{
    return $this->belongsToMany(Program::class, 'program_exercise')
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
