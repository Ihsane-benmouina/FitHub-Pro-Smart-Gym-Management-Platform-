<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'name',
    'serial_number',
    'category',
    'purchase_date',
    'status',
    'location',
    'notes',
])]

class Equipment extends Model
{
    //
    public function maintenances()
{
    return $this->hasMany(Maintenance::class);
}
}
