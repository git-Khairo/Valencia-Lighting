<?php

namespace App\Repository;

use App\Models\Product;
use App\Models\Category;
use App\Models\Project;
use App\RepositoryInterface\LayoutRepositoryInterface;


class LayoutRepository implements LayoutRepositoryInterface
{
  
    public function search($query)
    {
        return [
            'products' => Product::where('code', 'like', "%$query%")
                ->orWhere('name', 'like', "%$query%")
                ->orWhere('brand', 'like', "%$query%")
                ->get(),
            'categories' => Category::where('type', 'like', "%$query%")->get(),
            'projects' => Project::where('title', 'like', "%$query%")->get(),
        ];
    }
    public function defaultSearch()
    {
        return [
            'products' => Product::latest()->take(10)->get(),
            'categories' => Category::latest()->take(10)->get(),
            'projects' => Project::latest()->take(10)->get(),
        ];
    }
}
