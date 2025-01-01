<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Repository\ProductRepository;
use Inertia\Inertia;
use App\RepositoryInterface\ProductRepositoryInterface;
use App\Models\Category;

class ProductController extends Controller
{
    private  $ProductRepository;

    public function __construct(ProductRepositoryInterface  $ProductRepository){
        $this->ProductRepository=$ProductRepository;
    }
    /**
     * Display a listing of the Products.
     */
    public function index(){
        
    }


    public function showProdByCat(Request $request)
    {    
        $categoryIds = $request->input('categories', []);
            // Fetch products based on categories
            if(!empty($categoryIds))
            $products=$this->ProductRepository->byCategory($categoryIds);
            // Get all products if no categories are specified
            else if(empty($categoryIds))
            $products = $this->ProductRepository->allProducts(); 
        
        return Inertia::render('Products',['products'=> $products]);
    }

    public function showProjectProducts($projectId){
        $project=$this->ProductRepository->byProject($projectId);
        return Inertia::render('ProjectProducts', [
            'project' => $project,
            'products' => $project->products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
