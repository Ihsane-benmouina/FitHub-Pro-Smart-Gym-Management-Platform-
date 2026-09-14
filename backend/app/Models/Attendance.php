<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'member_id',
    'checked_in_by',
    'check_in_at',
    'check_out_at',
    'method',
])]

class Attendance extends Model
{
    //
    public function member()
{
    return $this->belongsTo(User::class, 'member_id');
}

public function checkedInBy()
{
    return $this->belongsTo(User::class, 'checked_in_by');
}
}
