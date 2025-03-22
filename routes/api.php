<?php

use App\Http\Controllers\AuthController;
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
    Route::get('/', [ProductController::class, 'filter']);
    Route::get('/{code}', [ProductController::class, 'byCode']);
});
Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/{id}', [ProjectController::class, 'show']);
});
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{id}', [CategoryController::class, 'show']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::get('/getUserLogin', [AuthController::class, 'getLoginCode']);

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/order/{id}', [OrderController::class,'show']);

    Route::post('/products', [ProductController::class, 'store']);     
    Route::put('/products/{code}', [ProductController::class, 'update']); 
    Route::delete('/products/{code}', [ProductController::class, 'destroy']);

    Route::post('/projects', [ProjectController::class, 'store']);  
    Route::put('/projects/{id}', [ProjectController::class, 'update']); 
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']); 

    Route::post('/categories', [CategoryController::class, 'store']);    
    Route::put('/categories/{id}', [CategoryController::class, 'update']); 
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); 
});