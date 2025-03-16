<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LayoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;

Route::get('/cart', [CartController::class, 'show']);
Route::get('/sections', [ProductController::class, 'getSections']);
Route::get('/latestProducts', [ProductController::class, 'getLatestProducts']);
Route::get('/search', [LayoutController::class, 'search']);
Route::get('/defaultSearch', [LayoutController::class, 'defaultSearch']);
Route::get('/home', [LayoutController::class, 'getHomePageData']);
Route::post('/orders', [OrderController::class, 'store']);

Route::prefix('products')->group(function () {
    Route::post('/', [ProductController::class, 'store']);      // Create a product
    Route::put('/{code}', [ProductController::class, 'update']);  // Update a product
    Route::delete('/{code}', [ProductController::class, 'destroy']); // Delete a product
    Route::get('/', [ProductController::class, 'filter']);
    Route::get('/{code}', [ProductController::class, 'byCode']);
});
Route::prefix('projects')->group(function () {
    Route::post('/', [ProjectController::class, 'store']);      // Create a project
    Route::put('/{id}', [ProjectController::class, 'update']);  // Update a project
    Route::delete('/{id}', [ProjectController::class, 'destroy']); // Delete a project
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/{id}', [ProjectController::class, 'show']);
});
Route::prefix('categories')->group(function () {
    Route::post('/', [CategoryController::class, 'store']);      // Create a project
    Route::put('/{id}', [CategoryController::class, 'update']);  // Update a project
    Route::delete('/{id}', [CategoryController::class, 'destroy']); // Delete a project
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{id}', [CategoryController::class, 'show']);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/order/{id}', [OrderController::class,'show']);
});