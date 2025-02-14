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
        return Product::whereHas('categories', function ($query) use ($categoryIds) {
            $query->whereIn('categories.id', $categoryIds);
        })
        ->where(function ($query) use ($categoryIds) {
            // Subquery to ensure that the product has all the specified categories
            $query->whereIn('products.id', function ($subQuery) use ($categoryIds) {
                $subQuery->select('product_id')
                         ->from('Products_Categories')
                         ->whereIn('category_id', $categoryIds)
                         ->groupBy('product_id')
                         ->havingRaw('count(DISTINCT category_id) = ?', [count($categoryIds)]);
            });
        })
        ->get();
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
