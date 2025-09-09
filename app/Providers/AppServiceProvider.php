<?php

namespace App\Providers;

use App\Models\Category;
use App\Repository\OrderRepository;
use Illuminate\Support\ServiceProvider;
use App\Repository\ProductRepository;
use App\RepositoryInterface\ProductRepositoryInterface;
use App\Repository\CategoryRepository;
use App\RepositoryInterface\CategoryRepositoryInterface;
use App\Repository\LayoutRepository;
use App\Repository\ProjectRepository;
use App\RepositoryInterface\LayoutRepositoryInterface;
use App\RepositoryInterface\OrderRepositoryInterface;
use App\RepositoryInterface\ProjectRepositoryInterface;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    
    public function register() {
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(LayoutRepositoryInterface::class, LayoutRepository::class);
        $this->app->bind(OrderRepositoryInterface::class, OrderRepository::class);
        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);
    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        URL::forceScheme('https');
    }
}
