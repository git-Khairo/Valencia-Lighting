<?php

namespace App\RepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Order;

interface OrderRepositoryInterface
{

    public function allOrders();
    public function getAllOrdersWithProducts(): Collection;
    public function findOrderById( $id);
}