<?php

namespace App\Providers;

use App\Models\Category;
use Illuminate\Support\ServiceProvider;
use App\Repository\ProductRepository;
use App\RepositoryInterface\ProductRepositoryInterface;
use App\Repository\CategoryRepository;
use App\RepositoryInterface\CategoryRepositoryInterface;
use App\Repository\LayoutRepository;
use App\RepositoryInterface\LayoutRepositoryInterface;
use Illuminate\Support\Facades\Schema;



class AppServiceProvider extends ServiceProvider
{
    
    public function register() {
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(LayoutRepositoryInterface::class, LayoutRepository::class);

    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

    }
}
