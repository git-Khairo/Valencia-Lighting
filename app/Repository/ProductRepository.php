<?php

namespace App\Repository;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Project;
use App\RepositoryInterface\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    public function allProducts(){
        return Product::all();
    }

    // Fetch products that have all the selected categories
    public function byCategory($categoryIds)
    {
    return Product::whereHas('categories', function ($query) use ($categoryIds) {
        $query->whereIn('categories.id', $categoryIds);
    })
    ->whereHas('categories', function ($query) use ($categoryIds)  // Ensure the product has the exact categories you are looking for
    {
        $query->whereIn('categories.id', $categoryIds); 
    }, '=', count($categoryIds))
    ->get();
    }


    // Fetch all the products that are in the selected project
    public function byProject($projectId)
    {
    // Fetch the project by ID
         $project = Project::with('products')->findOrFail($projectId);

        return $project;
}
}

