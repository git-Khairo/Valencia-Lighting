<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCardResource;
use App\Repository\ProductRepository; // Assuming this exists from your byCode method
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function show(Request $request)
    {
        $cartItems = $request->query('cart', []);

        if (empty($cartItems)) {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Cart is empty'
            ], 200);
        }

        $productIds = array_column($cartItems, 'product_id');
        $products = collect($productIds)->map(function ($id) {
            return $this->productRepository->byCode($id); 
        })->filter();

        if ($products->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Cart is empty'
            ], 404);
        }

        // Attach quantities from cartItems
        $productsWithQuantities = $products->map(function ($product) use ($cartItems) {
            $cartItem = collect($cartItems)->firstWhere('product_id', $product->code);
            $product->quantity = $cartItem ? $cartItem['quantity'] : null;
            return $product;
        });

        return response()->json([
            'success' => true,
            'data' => ProductCardResource::collection($productsWithQuantities),
            'message' => 'Cart retrieved successfully'
        ], 200);
    }
}