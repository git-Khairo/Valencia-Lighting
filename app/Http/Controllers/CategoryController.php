<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryCardResource;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Repository\CategoryRepository;
use App\Repository\CategoryRepositoryInterface;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    protected $CategoryRepository;

    // Inject the repository interface
    public function __construct(CategoryRepository $CategoryRepository)
    {
        $this->CategoryRepository = $CategoryRepository;
    }

    public function index()
    {
        $categories = $this->CategoryRepository->allCategories();

        return response()->json(['message' => 'Categories', 'Categories' => $categories], 200);
    }


    public static function getLatestCategory()
    {
        $products = Category::latest()->take(4)->get();

        return CategoryCardResource::collection($products);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            $validated = $request->validated();

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('categories', 'public');
                $validated['image'] = '/storage/' . $path;
            }

            $category = $this->CategoryRepository->create($validated);

            if (isset($validated['product_ids'])) {
                $category->products()->sync($validated['product_ids']);
            }

            return response()->json([
                'success' => true,
                'data' => new CategoryResource($category->load('products')),
                'message' => 'Category created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating category: ' . $e->getMessage()
            ], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::with('products')->findOrFail($id);

        return response()->json(['message' => 'category', 'category' => new CategoryResource($category)], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id)
{
    try {
        $validated = $request->validated();

        // Handle image upload if present
        if ($request->hasFile('image')) {
            $category = $this->CategoryRepository->findById($id);
            if ($category && $category->image) {
                $this->deleteFile($category->image);
            }
            $path = $request->file('image')->store('categories', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        // Update the category
        $category = $this->CategoryRepository->update($id, $validated);
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        // Handle product_ids (including empty arrays)
        $productIds = $request->input('product_ids');
        if (is_string($productIds)) {
            $productIds = json_decode($productIds, true) ?? [];
        } else {
            $productIds = $productIds ?? [];
        }
        $category->products()->sync($productIds);

        return response()->json([
            'success' => true,
            'data' => new CategoryResource($category->load('products')),
            'message' => 'Category updated successfully'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error updating category: ' . $e->getMessage()
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
    public function destroy($id)
    {
        try {
            $category = $this->CategoryRepository->findById($id); // Fetch the category before deleting

            // Delete the associated image if it exists
            if ($category && $category->image) {
                $this->deleteFile($category->image);
            }

            // Delete the category
            $deleted = $this->CategoryRepository->delete($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Category not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting category: ' . $e->getMessage()
            ], 500);
        }
    }
}
