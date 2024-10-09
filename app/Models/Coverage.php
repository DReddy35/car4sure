<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coverage extends Model
{
    use HasFactory;

    // Set the table name if it's not pluralized by default
    protected $table = 'coverages';

    // Define fillable properties for mass assignment
    protected $fillable = [
        'vehicle_id',
        'type',
        'limit',
        'deductible',
    ];

    // Define the relationship with the Vehicle model
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
