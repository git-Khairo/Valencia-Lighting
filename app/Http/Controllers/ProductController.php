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
use Illuminate\Support\Facades\Storage;

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
            $validated['image'] = $request->file('image')->store('products', 'public');
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

        if ($request->hasFile('image')) {
            if ($product->image) {
                $this->deleteFile($product->image);
            }
            $validated['image'] = '/storage/' . $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('datasheet')) {
            if ($product->datasheet) {
                $this->deleteFile($product->datasheet);
            }
            $validated['datasheet'] = '/storage/' . $request->file('datasheet')->store('datasheets', 'public');
        }

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
            'data' => $product,
            'message' => 'Product updated successfully'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error updating product: ' . $e->getMessage()
        ], 500);
    }
}

    // Helper method to delete a file from storage
    private function deleteFile($filePath)
    {
        $filePath = public_path() . $filePath;  // Get the full file path
        if (file_exists($filePath)) {
            unlink($filePath);  // Delete the file from storage
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
            // Find the product by code
            $product = $this->ProductRepository->ByCode($code);

            // If the product doesn't exist, return an error
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            // Delete the image if it exists
            if ($product->image) {
                $this->deleteFile($product->image);
            }

            // Delete the datasheet if it exists
            if ($product->datasheet) {
                $this->deleteFile($product->datasheet);
            }

            // Now delete the product
            $this->ProductRepository->delete($code);

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
