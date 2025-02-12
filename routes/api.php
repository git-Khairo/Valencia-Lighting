<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'filter']);
Route::get('/sections', [ProductController::class, 'getSections']);
Route::get('/categories', [ProductController::class, 'getCategories']);
