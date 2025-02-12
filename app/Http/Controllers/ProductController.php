<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductequest;
use App\Models\Product;
use App\Repository\ProductRepository;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Product
{
    protected $ProductRepository;

    // Inject the repository interface
    public function __construct(ProductRepository $ProductRepository)
    {
        $this->ProductRepository = $ProductRepository;
    }

    public function filter(Request $request){
        $categoriesId = $request->input('categories',[]);
        $brand= $request->input('brand',null);

        if(!empty($categoriesId)){
            $products=$this->ProductRepository->byCategory($categoriesId);
        }
        else $products = $this->ProductRepository->allProducts();

        if($brand!==null){
            $products = $this->ProductRepository->byBrand($products, $brand);
        }
        
        return response()->json([
            'message' => 'Filtered Products',
            'products' => ProductResource::collection($products)], 200);
    }



    public function getSections(Request $request)
    {
        $categoryIds = $request->input('categories', []);

        if (empty($categoryIds)) {
            return response()->json(['message' => 'No categories provided'], 400);
        }

        $data = [];

        foreach ($categoryIds as $categoryId) {
            // Get 7 random products for each category
            $products = $this->ProductRepository->byCategory([$categoryId])->random(7);

            if ($products->isNotEmpty()) {
                $data[] = [
                    'category_name' => $products->first()->categories->first()->name, // Assuming a product has categories
                    'products' => ProductResource::collection($products),
                ];
            }
        }
        return response()->json(['message' => 'Sections', 'Sections' => $products], 200);
    }


}
