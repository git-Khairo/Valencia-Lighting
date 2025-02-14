<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductequest;
use App\Models\Product;
use App\Models\Category;
use App\Repository\ProductRepository;
use Illuminate\Http\Request;
use App\Http\Resources\ProductCardResource;
use App\Http\Resources\ProductResource;


class ProductController extends Controller
{
    protected $ProductRepository;
    public function __construct(ProductRepository $ProductRepository)
    {
        $this->ProductRepository = $ProductRepository;
    }


    public function show($id)
    {
        $product=Product::with('categories')->find($id);

        if(!$product){
            return response()->json(['message' => 'Product Not Found'], 404);
        }
        return 
        response()->json(['message' => 'Product Detailes', 'product' => new ProductResource($product)], 200);
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
            'products' => ProductCardResource::collection($products)], 200);
    }



        public function getSections()
        {
            $categoryIds = Category::all()->pluck('id')->toArray();
            $data = [];

            foreach ($categoryIds as $categoryId) {
                $products = $this->ProductRepository->byCategory([$categoryId])->take(7);
                $categoryName = Category::where('id', $categoryId)->value('type');

                if ($products->isNotEmpty()) {
                    $data[] = [
                        'category_name' => $categoryName,
                        'products' => ProductCardResource::collection($products),
                    ];
                }
            }
            return response()->json(['message' => 'Sections', 'Sections' => $data], 200);
        }


    
    public function getLatestProducts()
    {
        $products = Product::latest()->take(10)->get();

        return response()->json([
            'message' => 'Latest Products',
            'products' => ProductCardResource::collection($products),
        ], 200);
    }


}
