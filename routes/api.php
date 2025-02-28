<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LayoutController;


Route::get('/products/{code}', [ProductController::class, 'byCode']);
Route::get('/products/{code}/related', [ProductController::class, 'related']);
Route::get('/products', [ProductController::class, 'filter']);
Route::get('/sections', [ProductController::class, 'getSections']);
Route::get('/categories', [CategoryController::class, 'allCategories']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/latestProducts', [ProductController::class, 'getLatestProducts']);
Route::get('/search', [LayoutController::class, 'search']);
Route::get('/defaultSearch', [LayoutController::class, 'defaultSearch']);