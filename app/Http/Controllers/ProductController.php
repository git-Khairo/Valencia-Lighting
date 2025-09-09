<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Category;
use App\Repository\ProductRepository;
use Illuminate\Http\Request;
use App\Http\Resources\ProductCardResource;
use App\Http\Resources\CategoryCardResource;
use App\Http\Resources\FullProductResource;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use Exception;

use function PHPUnit\Framework\isEmpty;

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
            $validated['datasheet'] = $request->file('datasheet')->store('datasheets', 'public');
        }

        $product = Product::create($validated);

        if ($request->has('category_ids')) $product->categories()->sync($request->category_ids);
        if ($request->has('project_ids')) $product->projects()->sync($request->project_ids);

        return response()->json(['product' => $product], 201);
    }

    public function update(UpdateProductRequest $request, $code)
    {
        try {
            $product = Product::where('code', $code)->firstOrFail();
            $validated = $request->validated();

            // Handle image upload
            if ($request->hasFile('image')) {
                if ($product->image) {
                    $this->deleteFile($product->image);
                }
                $path = '/storage/' .  $request->file('image')->store('products', 'public');
                $validated['image'] = $path;
            }

            // Handle datasheet upload
            if ($request->hasFile('datasheet')) {
                if ($product->datasheet) {
                    $this->deleteFile($product->datasheet);
                }
                $path = $request->file('datasheet')->store('datasheets', 'public');
                $validated['datasheet'] = $path;
            }

            // Update product
            $product->update($validated);

            // Handle category_ids
            $categoryIds = $request->input('category_ids');
            if (is_string($categoryIds)) {
                $categoryIds = json_decode($categoryIds, true) ?? [];
            } else {
                $categoryIds = $categoryIds ?? [];
            }
            $product->categories()->sync(array_unique($categoryIds));

            // Handle project_ids
            $projectIds = $request->input('project_ids');
            if (is_string($projectIds)) {
                $projectIds = json_decode($projectIds, true) ?? [];
            } else {
                $projectIds = $projectIds ?? [];
            }
            $product->projects()->sync(array_unique($projectIds));

            return response()->json([
                'success' => true,
                'data' => $product->load(['categories', 'projects']),
                'message' => 'Product updated successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating product: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($code)
    {
        try {
            $product = $this->ProductRepository->ByCode($code);
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            if ($product->image) {
                $this->deleteFile($product->image);
            }

            if ($product->datasheet) {
                $this->deleteFile($product->datasheet);
            }

            $this->ProductRepository->delete($code);

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting product: ' . $e->getMessage()
            ], 500);
        }
    }

    private function deleteFile($filePath)
    {
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }
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
        $categoryIds = Category::latest()->pluck('id')->toArray();
        $section = [];

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

        if(empty($section)){
            return response()->json(['message' => 'the sections are empty'], 200);
        }
        return response()->json(['message' => 'Sections', 'Sections' => $section], 200);
    }

    public function filter(Request $request)
    {
        $categoriesId = $request->input('categories', []);
        $brand = $request->input('brand', []);

        if (!empty($categoriesId)) {
            $products = $this->ProductRepository->byCategories($categoriesId);
            $products = $products->sortByDesc('created_at');
        } else $products = $this->ProductRepository->allProducts();

        if ($brand !== null) {
            $products = $this->ProductRepository->byBrand($products, $brand);
        }

        return response()->json($products);
        return response()->json([
            'message' => 'Filtered Products',
            'products' => ProductCardResource::collection($products)
        ], 200);
    }

    public function download(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);
    
        // Find the product
        $product = Product::where('code', $request->code)->first();
    
        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }
    
        // Get the path to the datasheet and remove '/public/' prefix
        $filePath = $product->datasheet;
    
        // Check if the file exists
        if ($filePath && Storage::disk('public')->exists($filePath)) {
            return Storage::disk('public')->download($filePath, $product->name . '.pdf');
        }
    
        return response()->json(['error' => 'File not found.'], 404);
    }
}