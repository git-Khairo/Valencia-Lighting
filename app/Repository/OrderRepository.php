<?php

namespace App\Repository;

use App\Models\Order;
use App\RepositoryInterface\OrderRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class OrderRepository implements OrderRepositoryInterface
{
    protected $model;

    public function __construct(Order $order)
    {
        $this->model = $order;
    }
    public function allOrders()
    {
        return Order::all();
    }


    public function getAllOrdersWithProducts(): Collection
    {
        return $this->model->with(['products' => function ($query) {
            $query->select('products.id', 'products.name', 'products.image', 'products_orders.quantity');
        }])
            ->select('id', 'firstName', 'lastName', 'email', 'phone', 'created_at')
            ->get();
    }
    public function findOrderById($id)
    {
        return $this->model->with(['products' => function ($query) {
            $query->select('products.code', 'products.name', 'products.image','products.title','products.brand');
        }])
            ->select('id', 'firstName', 'lastName', 'email', 'phone', 'created_at')
            ->find($id);
    }
}
