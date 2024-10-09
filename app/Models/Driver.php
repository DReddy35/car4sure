<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    // Set the table name if it's not pluralized by default
    // protected $table = 'drivers';

    // Define fillable properties for mass assignment
    protected $fillable = [
        'policy_id',
        'first_name',
        'last_name',
        'age',
        'gender',
        'marital_status',
        'license_number',
        'license_state',
        'license_status',
        'license_effective_date',
        'license_expiration_date',
        'license_class',
    ];

    // Define the relationship with the Policy model
    public function policy()
    {
        return $this->belongsTo(Policy::class);
    }
}
