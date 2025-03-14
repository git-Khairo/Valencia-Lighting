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
        'image',
        'description',
        'dateOfProject',
    ];

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
