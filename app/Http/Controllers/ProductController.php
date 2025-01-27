<?php

namespace App\Repository;

use App\Models\Product;
use App\Models\Project;
use App\RepositoryInterface\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    private $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function allProducts()
    {
        $products = $this->productRepository->allProducts();
        return response(['message' => 'All Products', 'products' => $products], 200);
    }

    // Fetch products that have all the selected categories
    public function byCategory($categoryIds)
    {
        $products = $this->productRepository->byCategory($categoryIds);

        return response(['message' => 'All Products', 'products' => $products], 200);
    }


    public function byBrand($products, $brand)
    {
        $products = $this->productRepository->byBrand($products, $brand);

        return response(['message' => 'All Products', 'products' => $products], 200);
    }

    public function byCode($code) {}
    // Fetch all the products that are in the selected project
    public function byProject($projectId)
    {
        $project = $this->productRepository->byProject($projectId);

        return response(['message' => 'All Products', 'project' => $project], 200);
    }
}
