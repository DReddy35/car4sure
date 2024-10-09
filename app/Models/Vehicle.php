<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    // Set the table name if it's not pluralized by default
    // protected $table = 'vehicles';

    // Define fillable properties for mass assignment
    protected $fillable = [
        'policy_id',
        'year',
        'make',
        'model',
        'vin',
        'usage',
        'primary_use',
        'annual_mileage',
        'ownership',
        'garaging_street',
        'garaging_city',
        'garaging_state',
        'garaging_zip',
    ];

    // Define the relationship with the Policy model
    public function policy()
    {
        return $this->belongsTo(Policy::class);
    }

    // Define the relationship with coverages
    public function coverages()
    {
        return $this->hasMany(Coverage::class);
    }
}
