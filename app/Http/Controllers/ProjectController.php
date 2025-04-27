<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Http\Resources\ProjectCardResource;
use App\Http\Resources\ProjectResource;
use App\Models\Product;
use App\Repository\ProjectRepository;
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

    public function show($id)
    {
        $project = Project::with('products')->findOrFail($id);

        return response()->json(['message' => 'project', 'project' => new ProjectResource($project)], 200);
    }

    public static function getLatestProjects()
    {
        $projects = Project::latest()->take(5)->get();
        return ProjectCardResource::collection($projects);
    }

    // Store a new project
    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        // Handle image upload if present
        if ($request->hasFile('images')) {
            $paths = [];
            // Store each image and prepare the paths
            foreach ($request->file('images') as $image) {
                $paths[] = '/storage/' . $image->store('projects', 'public');
            }
            $validated['images'] = json_encode($paths); // Save image paths as JSON
        }

        // Create the project and associate products
        $project = Project::create($validated);
        // Handle product_ids
        $productCodes = $request->input('product_ids');
        if (is_string($productCodes)) {
            $productCodes = json_decode($productCodes, true) ?? [];
        } else {
            $productCodes = $productCodes ?? [];
        }
        
        // Convert product codes to IDs
        $productIds = [];
        if (!empty($productCodes)) {
            $productIds = Product::whereIn('code', array_unique($productCodes))
                ->pluck('id')
                ->toArray();
        }

        $project->products()->sync(array_unique($productIds));

        return response()->json(['project' => new ProjectResource($project)], 201);
    }

    // Update an existing project
    public function update(UpdateProjectRequest $request, $id)
    {
        try {
            $project = Project::findOrFail($id);
            $validated = $request->validated();
            
            if ($request->hasFile('images')) {
                $paths = [];
                if ($project->images) {
                    $oldImages = json_decode($project->images, true);
                    if (is_array($oldImages)) {
                        foreach ($oldImages as $oldImage) {
                            $this->deleteFile($oldImage);
                        }
                    }
                }
                foreach ($request->file('images') as $image) {
                    $paths[] = '/storage/' . $image->store('projects', 'public');
                }
                $validated['images'] = json_encode($paths);
            } elseif ($request->has('existing_images')) {
                $validated['images'] = $request->input('existing_images');
            }
            
            $project->update($validated);
            
            // Handle product_ids
            $productCodes = $request->input('product_ids');
            if (is_string($productCodes)) {
                $productCodes = json_decode($productCodes, true) ?? [];
            } else {
                $productCodes = $productCodes ?? [];
            }
            
            // Convert product codes to IDs
            $productIds = [];
            if (!empty($productCodes)) {
                $productIds = Product::whereIn('code', array_unique($productCodes))
                    ->pluck('id')
                    ->toArray();
            }

            $project->products()->sync(array_unique($productIds));
    
            return response()->json([
                'success' => true,
                'data' => new ProjectResource($project),
                'message' => 'Project updated successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating project: ' . $e->getMessage()
            ], 500);
        }
    }
    
    // Helper method to delete files from storage
    private function deleteFile($filePath)
    {
        $filePath = public_path() . $filePath; // Get the full file path
        if (file_exists($filePath)) {
            unlink($filePath); // Delete the file from storage
        }
    }
    

    public function destroy($id)
    {
        try {
            $project = Project::findOrFail($id);

            // Delete the associated images if they exist
            if ($project->images) {
                $oldImages = json_decode($project->images); // Decoding the JSON array of image paths
                foreach ($oldImages as $oldImage) {
                    $this->deleteFile($oldImage); // Delete each image
                }
            }

            // Now delete the project
            $deleted = $this->projectRepository->delete($id);

            if (!$deleted) {
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
