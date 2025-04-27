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
            'images' => json_encode(['https://picsum.photos/200','https://picsum.photos/200']),
            'description' => $this->faker->paragraph(),
            'quote' => $this->faker->sentence(),
            'paragraph' => json_encode([
            [
                'title' => 'First Title',
                'paragraph' => 'Hello, this is the first paragraph.'
            ],
            [
                'title' => 'Second Title',
                'paragraph' => 'Hello, this is the second paragraph.'
            ]
            ]),
            'location' => $this->faker->word(),
            'partners' => $this->faker->word(),
            'dateOfProject' => $this->faker->date(),
        ];
    }
}
