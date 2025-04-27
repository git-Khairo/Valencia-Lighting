<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repository\LayoutRepository;
use App\Http\Resources\ProductCardResource;
use App\Http\Resources\CategoryCardResource;
use App\Http\Resources\ProjectCardResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Project;

class LayoutController extends Controller
{
    protected $LayoutRepository;
    public function __construct(LayoutRepository $LayoutRepository)
    {
        $this->LayoutRepository = $LayoutRepository;
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json([
                'message' => 'Please provide a search query.'
            ], 400);
        }

        $results = $this->LayoutRepository->search($query);

        return response()->json([
            'message' => 'Search',
            'products' => ProductCardResource::collection($results['products']),
            'categories' => CategoryCardResource::collection($results['categories']),
            'projects' => ProjectCardResource::collection($results['projects']),
        ],200);
    }
    public function defaultSearch()
    {
        $results = $this->LayoutRepository->defaultSearch();

        return response()->json([
            'message' => 'Default Search',
            'products' => ProductCardResource::collection($results['products']),
            'categories' => CategoryCardResource::collection($results['categories']),
            'projects' => ProjectCardResource::collection($results['projects']),
        ],200);
    }

    public function getHomePageData(){
        $products = ProductController::getLatestProducts();
        $projects = ProjectController::getLatestProjects();
        $category = CategoryController::getLatestCategory();

        return response()->json(['message' => "home page data", 'products' => $products, 'projects' => $projects, 'category' => $category], 200);
    }

    public function suggested(){
        $products = Product::select('name')->latest()->take(2)->pluck('name')->toArray();
        $categories = Category::select('type')->latest()->take(2)->pluck('type')->toArray();
        $project = Project::select('title')->latest()->take(1)->pluck('title')->toArray();
    
        return array_merge($products, $categories, $project);
    }
}
