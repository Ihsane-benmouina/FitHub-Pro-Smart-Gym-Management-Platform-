<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
