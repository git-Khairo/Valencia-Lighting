<?php

namespace App\RepositoryInterface;

use App\Models\Product;

interface ProductRepositoryInterface
{

    public function allProducts();
    public function byCode($code);
    public function getLatestProducts();
    public function byCategory($categories);
    public function byCategories($categories);
    public function byBrand($products , $brand);
    public function byProject($projects);
}