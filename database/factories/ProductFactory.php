<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'image' => $this->faker->imageUrl(200, 200, 'products'),
            'title' =>$this->faker->company(),
            'brand' => $this->faker->company(),
            'description' => $this->faker->paragraph(),
            'code' => $this->faker->unique()->ean13(), // Generates a unique 13-digit product code
        ];
    }
}
