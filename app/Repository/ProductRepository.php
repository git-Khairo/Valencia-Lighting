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

    public function byCode($code) {
        $product = Product::with('categories')->where('code', $code)->first();
        return $product;
    }

    public function getLatestProducts() {
        $products = Product::latest()->take(10)->get();
        return $products;
    }

    public function byCategory($categoryId)
    {
    return Product::whereHas('categories', function ($query) use ($categoryId) {
        $query->whereIn('categories.id', $categoryId);
    });
    }

   
    // Fetch products that have all the selected categories
    public function byCategories($categoryIds)
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

    
    
    // Fetch all the products that are in the selected project
    public function byProject($projectId)
    {
        // Fetch the project by ID
        $project = Project::with('products')->findOrFail($projectId);

        return $project;
    }
}
