<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\ProjectResource;
use App\Repository\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    protected $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {
        $projects = Project::all();
        return response()->json(['message' => 'All Projects', 'projects' => ProjectCardResource::collection($projects)], 200);
    }

    public static function getLatestProjects()
    {
        $projects = Project::latest()->take(5)->get();
        return ProjectCardResource::collection($projects);
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $image) {
                $paths[] = '/storage/' . $image->store('projects', 'public');
            }
            $validated['images'] = json_encode($paths);
        }

        $project = Project::create($validated);
        if ($request->has('product_ids')) $project->products()->sync($request->product_ids);

        return response()->json(['project' => $project], 201);
    }

    public function update(UpdateProjectRequest $request, $id)
    {
        $project = Project::findOrFail($id);
        $validated = $request->validated();

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $image) {
                $paths[] = '/storage/' . $image->store('projects', 'public');
            }
            $validated['images'] = json_encode($paths);
        } elseif ($request->has('existing_images')) {
            $validated['images'] = $request->input('existing_images');
        }

        $project->update($validated);
        if ($request->has('product_ids')) {
            $uniqueProductIds = array_unique($request->product_ids);
            $project->products()->sync($uniqueProductIds);
        }

        return response()->json(['project' => $project], 200);
    }

    public function show($id)
    {
        $project = Project::with('products')->findOrFail($id);
        return response()->json(['message' => 'Project', 'project' => new ProjectResource($project)], 200);
    }



    public function destroy($id)
    {
        try {
            $project = $this->projectRepository->delete($id);

            if (!$project) {
                return response()->json(['success' => false, 'message' => 'Project not found'], 404);
            }

            return response()->json(['success' => true, 'message' => 'Project deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting project: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error deleting project: ' . $e->getMessage()
            ], 500);
        }
    }
}
