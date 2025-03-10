<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'phone',
    ];
    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_orders', 'order_id', 'product_id')
            ->withPivot('quantity');  // Include the quantity in the pivot table
    }
}
