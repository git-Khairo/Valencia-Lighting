<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'images' => json_decode($this->images),
            'description' => $this->description,
            'paragraph' => json_decode($this->paragraph),
            'quote' => $this->quote,
            'location' => $this->location,
            'partners' => $this->partners,
            'dateOfProject' => $this->dateOfProject, 
            'products' => ProductCardResource::collection($this->products),
        ];
    }
}