<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LayoutController;
use Inertia\Inertia;



Route::get("/",  [LayoutController::class ,'index'])->name('Home');

//dashboard route to chech if the user is authunticated
Route::get('/dashboard', [LayoutController::class ,'dashboard'])->name('dashboard')->middleware('auth');


Route::resource('products',ProductController::class);

//get all products or by category
Route::get('/products', [ProductController::class, 'getProdByCat']);


Route::resource('Categories',CategoryController::class);

Route::resource('projects',ProjectController::class);
