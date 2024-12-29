<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'brand',
        'image',
        'dateOfRelease',
        'code',
    ];
    
    public function categories(){
        return $this->belongsToMany(Category::class);
    }
    public function projects(){
        return $this->belongsToMany(Project::class);
    }
}
