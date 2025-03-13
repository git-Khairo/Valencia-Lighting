<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryCardResource;
use App\Models\Category;
use App\Repository\CategoryRepository;
use App\Repository\CategoryRepositoryInterface;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    protected $CategoryRepository;

    // Inject the repository interface
    public function __construct(CategoryRepository $CategoryRepository)
    {
        $this->CategoryRepository = $CategoryRepository;
    }
    public function allCategories(){
        $categories= $this->CategoryRepository->allCategories();

        return response()->json(['message' => 'Categories', 'Categories' => $categories], 200);
    }

    public static function getLatestCategory()
    {
        $products = Category::latest()->take(4)->get();

        return CategoryCardResource::collection($products);
    }
}
