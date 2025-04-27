<?php
namespace Database\Factories; 

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        return [
            'type' => $this->faker->word(),
            'image' => "https://picsum.photos/200",
            'location' => $this->faker->randomElement(['Indoor', 'Outdoor']),

        ];
    }
}
