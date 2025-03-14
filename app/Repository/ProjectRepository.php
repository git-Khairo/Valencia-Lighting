<?php
namespace App\Repository;

use App\Models\Project;
use App\RepositoryInterface\ProjectRepositoryInterface;

class ProjectRepository implements ProjectRepositoryInterface
{
    protected $model;

    public function __construct(Project $model)
    {
        $this->model = $model;
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
        $project = $this->findById($id);
        if ($project) {
            $project->update($data);
        }
        return $project;
    }

    public function delete($id)
    {
        $project = $this->findById($id);
        if ($project) {
            $project->products()->detach();
            return $project->delete();
        }
        return false;
    }
}