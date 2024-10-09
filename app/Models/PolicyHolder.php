<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyHolder extends Model
{
    use HasFactory;

    protected $fillable = ['policy_id', 'first_name', 'last_name', 'street', 'city', 'state', 'zip'];

    protected $casts = [
        'policy_holder' => 'array',
    ];

    // public function getAddressAttribute()
    // {
    //     return [
    //         'street' => $this->street,
    //         'city' => $this->city,
    //         'state' => $this->state,
    //         'zip' => $this->zip,
    //     ];
    // }

    // // Mutator to accept 'address' as an object and split it into individual columns
    // public function setAddressAttribute($value)
    // {
    //     $this->attributes['street'] = $value['street'] ?? null;
    //     $this->attributes['city'] = $value['city'] ?? null;
    //     $this->attributes['state'] = $value['state'] ?? null;
    //     $this->attributes['zip'] = $value['zip'] ?? null;
    // }

    public function policy()
    {
        return $this->belongsTo(Policy::class);
    }
}
