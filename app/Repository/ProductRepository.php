<?php

namespace App\Repository;

use App\Models\Product;
use App\Models\Project;
use App\RepositoryInterface\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    public function allProducts()
    {
        return Product::all();
    }

    // Fetch products that have all the selected categories
    public function byCategory($categoryIds)
    {
        $products = Product::whereHas('categories', function ($query) use ($categoryIds) {
            $query->whereIn('categories.id', $categoryIds);
        })->get();
        
        return $products;
    }


    public function byBrand($products, $brand)
    {
        return $products->where('brand', $brand);
    }

    public function byCode($code) {}
    
    // Fetch all the products that are in the selected project
    public function byProject($projectId)
    {
        // Fetch the project by ID
        $project = Project::with('products')->findOrFail($projectId);

        return $project;
    }
}
