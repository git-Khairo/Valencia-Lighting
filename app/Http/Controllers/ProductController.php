<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Category;
use App\Repository\ProductRepository;
use Illuminate\Http\Request;
use App\Http\Resources\ProductCardResource;
use App\Http\Resources\CategoryCardResource;
use App\Http\Resources\FullProductResource;
use App\Http\Resources\ProductResource;


class ProductController extends Controller
{
    protected $ProductRepository;
    public function __construct(ProductRepository $ProductRepository)
    {
        $this->ProductRepository = $ProductRepository;
    }



    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = '/storage/' . $request->file('image')->store('products', 'public');
        }
        if ($request->hasFile('datasheet')) {
            $validated['datasheet'] = '/storage/' . $request->file('datasheet')->store('datasheets', 'public');
        }

        $product = Product::create($validated);

        if ($request->has('category_ids')) $product->categories()->sync($request->category_ids);
        if ($request->has('project_ids')) $product->projects()->sync($request->project_ids);

        return response()->json(['product' => $product], 201);
    }

    public function update(UpdateProductRequest $request, $code)
    {
        $product = Product::where('code', $code)->firstOrFail();
        $validated = $request->validated();

        

        if ($request->hasFile('image')) {
            $validated['image'] = '/storage/' . $request->file('image')->store('products', 'public');
        }
        if ($request->hasFile('datasheet')) {
            $validated['datasheet'] = '/storage/' . $request->file('datasheet')->store('datasheets', 'public');
        }

        $product->update(['name'=>(string) $validated['name']]);
        if ($request->has('category_ids')) {
            $product->categories()->sync(array_unique($request->category_ids));
        }
        if ($request->has('project_ids')) {
            $product->projects()->sync(array_unique($request->project_ids));
        }
        

        return response()->json(['product' => $product,'val'=>$validated], 200);
    }


    public function byCode($code)
    {
        $product = $this->ProductRepository->byCode($code);

        $relatedProducts = ProductController::related($code);

        if (!$product) {
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

    public function filter(Request $request)
    {
        $categoriesId = $request->input('categories', []);
        $brand = $request->input('brand', []);

        if (!empty($categoriesId)) {
            $products = $this->ProductRepository->byCategories($categoriesId);
        } else $products = $this->ProductRepository->allProducts();

        if ($brand !== null) {
            $products = $this->ProductRepository->byBrand($products, $brand);
        }

        return response()->json([
            'message' => 'Filtered Products',
            'products' => ProductCardResource::collection($products)
        ], 200);
    }



    public function destroy($code)
    {
        try {
            $deleted = $this->ProductRepository->delete($code);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting product: ' . $e->getMessage()
            ], 500);
        }
    }
}
