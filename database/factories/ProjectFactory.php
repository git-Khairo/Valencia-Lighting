<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Project;


class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),
            'image' => $this->faker->word(),
            'description' => $this->faker->word(),
            'dateOfProject' => $this->faker->date(),
        ];
    }
}
