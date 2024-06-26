<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'length',
        'description',
        'avatar',
    ];
    
    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class, 'movieId');
    }
}
