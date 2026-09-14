<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'equipment_id',
    'reported_by',
    'description',
    'type',
    'status',
    'scheduled_date',
    'completed_date',
    'cost',
])]

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
