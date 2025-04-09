<?php
namespace App\RepositoryInterface;

use App\Models\Project;

interface ProjectRepositoryInterface
{
    public function create(array $data);

    public function findById($id);

    public function update($id, array $data);

    public function delete($id);

    public function allForSelection();
    
    public function findFull($id);
}