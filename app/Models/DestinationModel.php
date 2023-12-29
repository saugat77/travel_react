<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DestinationModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['title', 'image_src', 'location', 'category', 'fees', 'is_active'];
}
