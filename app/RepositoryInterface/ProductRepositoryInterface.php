<?php

namespace App\RepositoryInterface;

use App\Models\Product;

interface ProductRepositoryInterface
{

    public function allProducts();
    public function byCategory($categories);
    public function byProject($projects);
}