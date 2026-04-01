<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ArtigosEsportivos>
 */
class ArtigosEsportivosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'brand' => fake()->randomElement(['Nike', 'Adidas', 'Wilson', 'Penalty', 'Puma']),
            'price' => fake()->randomFloat(2, 50, 1500),
            'year' => fake()->year(),
            'image' => fake()->imageUrl(640, 480, 'sports'),
            'amount' => fake()->numberBetween(1, 100),
            'category_id' => \App\Models\Category::factory()
        ];
    }
}
