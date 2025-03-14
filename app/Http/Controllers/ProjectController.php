<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\ProjectResource;
use App\Repository\ProjectRepository;

class ProjectController extends Controller
{
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

       

    public function index(){

        $projects = Project::all();

        return response()->json(['message' => 'All Projects', 'projects' => ProjectCardResource::collection($projects)], 200);
    }

    public static function getLatestProjects()
    {
        $products = Project::latest()->take(5)->get();

        return ProjectCardResource::collection($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            $validated = $request->validated();
            $project = $this->projectRepository->create($validated);

            if (isset($validated['product_ids'])) {
                $project->products()->sync($validated['product_ids']);
            }

            return response()->json([
                'success' => true,
                'data' => new ProjectResource($project->load('products')),
                'message' => 'Project created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating project: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = Project::with('products')->findOrFail($id);

        return response()->json(['message' => 'Project', 'project' => new ProjectResource($project)], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $project = $this->projectRepository->update($id, $validated);

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found'
                ], 404);
            }

            if (isset($validated['product_ids'])) {
                $project->products()->sync($validated['product_ids']);
            }

            return response()->json([
                'success' => true,
                'data' => new ProjectResource($project->load('products')),
                'message' => 'Project updated successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating project: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $deleted = $this->projectRepository->delete($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting project: ' . $e->getMessage()
            ], 500);
        }
    }
}
