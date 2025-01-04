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

//get by category
Route::get('/products', [ProductController::class, 'filter']);

//get products that belongs to a project
Route::get('/projects/{project}/products', [ProductController::class, 'showProjectProducts']);

Route::resource('Categories',CategoryController::class);

Route::resource('projects',ProjectController::class);
