<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repository\LayoutRepository;
use App\Http\Resources\ProductCardResource;
use App\Http\Resources\CategoryCardResource;
use App\Http\Resources\ProjectCardResource;

class LayoutController extends Controller
{
    protected $LayoutRepository;
    public function __construct(LayoutRepository $LayoutRepository)
    {
        $this->LayoutRepository = $LayoutRepository;
    }

    public function index(){
        return route('home');
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
}
