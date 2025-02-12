<?php

namespace App\Repository;


use App\Models\Category;
use App\RepositoryInterface\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface
{
    
    public function allCategories()
    {
        return Category::all();
    }
}