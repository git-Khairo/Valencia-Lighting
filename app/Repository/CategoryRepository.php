<?php

namespace App\Repository;


use App\Models\Category;
use App\RepositoryInterface\CategoryRepositoryInterface;
use App\Http\Resources\FullCategoryResource;

class CategoryRepository implements CategoryRepositoryInterface
{
    
    protected $model;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }

    public function allCategories()
    {
        return Category::all();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function findById($id)
    {
        return $this->model->with('products')->find($id);
    }

    public function update($id, array $data)
    {
        $category = $this->findById($id);
        if ($category) {
            $category->update($data);
        }
        return $category;
    }

    public function delete($id)
    {
        $category = $this->findById($id);
        if ($category) {
            $category->products()->detach();
            return $category->delete();
        }
        return false;
    }

    public function allForSelection()
    {
        return Category::select('id', 'type')->get();
    }

    public function findFull($id)
    {
        $category = Category::with('products')->findOrFail($id);
        return new FullCategoryResource($category);
    }
}