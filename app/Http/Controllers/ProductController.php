<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductequest;
use App\Models\Product;
use App\Models\Category;
use App\Repository\ProductRepository;
use Illuminate\Http\Request;
use App\Http\Resources\ProductCardResource;
use App\Http\Resources\CategoryCardResource;
use App\Http\Resources\ProductResource;


class ProductController extends Controller
{
    protected $ProductRepository;
    public function __construct(ProductRepository $ProductRepository)
    {
        $this->ProductRepository = $ProductRepository;
    }


    public function byCode($code)
    {
        $product = $this->ProductRepository->byCode($code);

        if(!$product){
            return response()->json(['message' => 'Product Not Found'], 404);
        }
        return 
        response()->json(['message' => 'Product Details', 'product' => new ProductResource($product)], 200);
    }

    public function related($code)
    {
        $relatedProducts = $this->ProductRepository->getRelatedByCategories($code);
        return 
        response()->json(['message' => 'Related Products', 'products' => ProductResource::collection($relatedProducts),], 200);

    }

    public function getLatestProducts()
    {
        $products = $this->ProductRepository->getLatestProducts();

        return response()->json([
            'message' => 'Latest Products',
            'products' => ProductCardResource::collection($products),
        ], 200);
    }

    public function getSections()
    {
        $categoryIds = Category::all()->pluck('id')->toArray();
        $data = [];

        foreach ($categoryIds as $categoryId) {
            $products = $this->ProductRepository->byCategory([$categoryId])->inRandomOrder()->take(7)->get();
            $category = Category::where('id', $categoryId)->first();

            if ($products->isNotEmpty()) {
                $section[] = [
                    'category' => new CategoryCardResource($category),
                    'products' => ProductCardResource::collection($products),
                ];
            }
        }
        return response()->json(['message' => 'Sections', 'Sections' => $section], 200);
    }

    public function filter(Request $request){
        $categoriesId = $request->input('categories',[]);
        $brand= $request->input('brand',null);

        if(!empty($categoriesId)){
            $products=$this->ProductRepository->byCategories($categoriesId);
        }
        else $products = $this->ProductRepository->allProducts();

        if($brand!==null){
            $products = $this->ProductRepository->byBrand($products, $brand);
        }
        
        return response()->json([
            'message' => 'Filtered Products',
            'products' => ProductCardResource::collection($products)], 200);
    }


    
   


}
