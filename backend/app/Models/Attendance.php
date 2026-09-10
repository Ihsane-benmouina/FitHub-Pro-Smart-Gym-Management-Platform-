<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
