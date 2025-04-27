<?php

namespace App\RepositoryInterface;

use App\Models\Product;

interface ProductRepositoryInterface
{

    public function allProducts();
    public function byCode($code);
    public function byCategory($categories);
    public function byCategories($categories);
    public function byBrand($products , $brand);
    public function byProject($projects);
    public function getRelatedByCategories(string $code, int $limit = 4);
    public function allForSelection();

    public function findFullByCode($code);
}