<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products', [ProductController::class, 'filter']);
Route::get('/sections', [ProductController::class, 'getSections']);
Route::get('/categories', [CategoryController::class, 'allCategories']);
Route::get('/latestProducts', [ProductController::class, 'getLatestProducts']);