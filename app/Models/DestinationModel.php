<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DestinationModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['title', 'image_src', 'location', 'category', 'fees', 'is_active'];
    public function imageSrc(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset(Storage::url($value)),
        );
    }
}
