<?php

namespace Database\Seeders; 

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Project;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = Product::factory()->count(50)->create(); // Generate 50 products

        // Attach each product to 1-3 random categories
        $categories = Category::all();
        foreach ($products as $product) {
            $product->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        }

        $projects = Project::all();
        foreach ($products as $product) {
            $product->projects()->attach(
                $projects->random(rand(1, 4))->pluck('id')->toArray()
            );
        }
    }
}
