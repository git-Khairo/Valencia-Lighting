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
            'image' => "https://picsum.photos/200",
            'title' =>$this->faker->company(),
            'brand' => $this->faker->randomElement(['sila', 'radial']),
            'description' => $this->faker->paragraph(),
            'dateOfRelease' => $this->faker->date(),
            'code' => $this->faker->unique()->ean13(),
            'material' => $this->faker->word(),
            'productNumber' => $this->faker->word(),
            'length' => $this->faker->word(),
            'color' => $this->faker->word(),
            'accessories' => $this->faker->word(),
        ];
    }
}
