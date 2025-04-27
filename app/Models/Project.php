<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;
        /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'quote',
        'location',
        'partners',
        'images',
        'description',
        'paragraph',
        'dateOfProject',
    ];
    protected $casts = ['images' => 'array']; // Cast JSON to array
    public function products()
    {
        return $this->belongsToMany(
            Product::class,
            'Products_Projects',
            'project_id',
            'product_id'
        );
    }
}
