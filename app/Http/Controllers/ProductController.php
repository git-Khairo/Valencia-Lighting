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

        $relatedProducts = ProductController::related($code);

        if(!$product){
            return response()->json(['message' => 'Product Not Found'], 404);
        }
        $product = [
            'product' => new ProductResource($product),
            'relatedProducts' => $relatedProducts
        ];
        return response()->json(['message' => 'Product Details', 'product' => $product], 200);
    }

    public function related($code)
    {
        $relatedProducts = $this->ProductRepository->getRelatedByCategories($code);

        return ProductCardResource::collection($relatedProducts);
    }

    public static function getLatestProducts()
    {
        $products = Product::latest()->take(6)->get();

        return ProductCardResource::collection($products);
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
