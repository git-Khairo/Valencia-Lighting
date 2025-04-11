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
        return $this->model
            ->select('id', 'firstName', 'lastName', 'email', 'address' ,'phone', 'created_at')->where('state','!=',1)
            ->get();
    }
    public function findOrderById($id)
    {
        return $this->model->with(['products' => function ($query) {
            $query->select('products.code', 'products.name', 'products.image','products.title','products.brand');
        }])
            ->select('id', 'firstName', 'lastName', 'email', 'phone', 'address' , 'created_at')
            ->find($id);
    }
}
