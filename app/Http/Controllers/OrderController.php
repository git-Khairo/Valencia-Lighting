<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use App\Repository\OrderRepository;
use App\RepositoryInterface\OrderRepositoryInterface;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        try {
            $orders = $this->orderRepository->getAllOrdersWithProducts();

            return response()->json([
                'message' => 'Orders retrieved successfully',
                'orders' => OrderResource::collection($orders)
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving orders: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        // Validate the incoming request data
        $validated = $request->validated();
        // Create a new order
        $order = Order::create([
            'firstName' => $validated['firstName'],
            'lastName' => $validated['lastName'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address']
        ]);

        // Attach products to the order
        foreach ($validated['products'] as $product) {
            // Find the product by its code
            $productModel = Product::where('code', $product['id'])->firstOrFail();

            // Attach the product to the order using its ID
            $order->products()->attach($productModel->id, ['quantity' => $product['quantity']]);
        }

        // Return a response, maybe the created order or a success message
        return response()->json([
            'success' => true,
            'order' => $order,
        ]);
    }

    public function endOrder($id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->state = 1;
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Order ended successfully.',
                'order' => $order
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to end order: ' . $e->getMessage()
            ], 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $order = $this->orderRepository->findOrderById($id);

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => new OrderResource($order),
                'message' => 'Order retrieved successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving order: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
