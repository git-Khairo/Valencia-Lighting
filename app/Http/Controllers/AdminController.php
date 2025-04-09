<?php

namespace App\Http\Controllers;

use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use App\Repository\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    protected $productRepository;
    protected $categoryRepository;
    protected $projectRepository;

    public function __construct(
        ProductRepository $productRepository,
        CategoryRepository $categoryRepository,
        ProjectRepository $projectRepository
    ) {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
        $this->projectRepository = $projectRepository;
    }

    public function getSelectionItems(Request $request)
    {
        try {
            $type = $request->query('type');

            switch ($type) {
                case 'product':
                    return response()->json([
                        'categories' => $this->categoryRepository->allForSelection(),
                        'projects' => $this->projectRepository->allForSelection(),
                    ]);

                case 'category':
                    return response()->json([
                        'products' => $this->productRepository->allForSelection(),
                    ]);

                case 'project':
                    return response()->json([
                        'products' => $this->productRepository->allForSelection(),
                    ]);

                default:
                    return response()->json(['error' => 'Invalid type specified'], 400);
            }
        } catch (\Exception $e) {
            Log::error('Selection Items Error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['error' => 'Server error occurred'], 500);
        }
    }

    public function getEditItem(Request $request, $identifier) // Rename $id to $identifier for clarity
{
    $type = $request->query('type');
    Log::info('Received type: ' . $type . ', Identifier: ' . $identifier);

    if (!$type) {
        return response()->json(['error' => 'Type parameter is required'], 400);
    }

    try {
        switch ($type) {
            case 'product':
                // Use code instead of id
                return $this->productRepository->findFullByCode($identifier);
            case 'category':
                return $this->categoryRepository->findFull($identifier);
            case 'project':
                return $this->projectRepository->findFull($identifier);
            default:
                return response()->json(['error' => 'Invalid type specified'], 400);
        }
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        Log::warning('Item not found: ' . $type . ' Identifier: ' . $identifier);
        return response()->json(['error' => 'Item not found'], 404);
    } catch (\Exception $e) {
        Log::error('Edit Item Error: ' . $e->getMessage(), ['exception' => $e]);
        return response()->json(['error' => 'Server error occurred'], 500);
    }
}
}