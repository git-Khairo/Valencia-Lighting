<?php

namespace App\Repository;

use App\Models\Product;
use App\Models\Category;
use App\repositoryInterface\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    public function allProducts(){
        return Product::all();
    }
    public function byCategory($categoryIds)
    {
        $products = Product::whereIn('category_id', $categoryIds)->get() ;
        return $products;
    }
}
