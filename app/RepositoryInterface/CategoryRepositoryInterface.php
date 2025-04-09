<?php

namespace App\RepositoryInterface;

use App\Models\Category;

interface CategoryRepositoryInterface
{

    public function create(array $data);

    public function findById($id);

    public function update($id, array $data);

    public function delete($id);

    public function allForSelection();
    
    public function findFull($id);
}