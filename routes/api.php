<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LayoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AdminController;

Route::post('/cart', [CartController::class, 'show']);
Route::get('/sections', [ProductController::class, 'getSections']);
Route::get('/latestProducts', [ProductController::class, 'getLatestProducts']);
Route::get('/search', [LayoutController::class, 'search']);
Route::get('/defaultSearch', [LayoutController::class, 'defaultSearch']);
Route::get('/home', [LayoutController::class, 'getHomePageData']);
Route::post('/orders', [OrderController::class, 'store']);
Route::post('/download', [ProductController::class, 'download']);
Route::get('/suggested', [LayoutController::class, 'suggested']);



Route::prefix('products')->group(function () {
    Route::post('/', function (\Illuminate\Http\Request $r){ return response()->json(['ok' => true]); });
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
Route::post('/CheckAuth', [AuthController::class, 'checkAuth']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/order/{id}', [OrderController::class, 'show']);
    Route::post('/order/{id}/end', [OrderController::class, 'endOrder']);

    Route::get('/selection-items', [AdminController::class, 'getSelectionItems']);
    Route::get('/edit-item/{id}', [AdminController::class, 'getEditItem']);

    Route::post('/products/store', [ProductController::class, 'store']);
    Route::post('/products/{code}', [ProductController::class, 'update']);
    Route::delete('/products/{code}', [ProductController::class, 'destroy']);

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::post('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::post('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});
