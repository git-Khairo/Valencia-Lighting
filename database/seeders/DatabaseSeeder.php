<?php
namespace Database\Seeders; // ✅ Correct namespace

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call individual seeders here
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            ProjectSeeder::class,
        ]);
    }
}