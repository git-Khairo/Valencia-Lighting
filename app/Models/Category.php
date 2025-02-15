<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'type',
        'image',
    ];

    public function products()
{
    return $this->belongsToMany(
        Product::class,             
        'Products_Categories',     
        'category_id',              
        'product_id'
    );
}

}
