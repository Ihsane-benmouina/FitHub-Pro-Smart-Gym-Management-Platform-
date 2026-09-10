<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    //
    public function equipment()
{
    return $this->belongsTo(Equipment::class);
}

public function reporter()
{
    return $this->belongsTo(User::class, 'reported_by');
}
}
