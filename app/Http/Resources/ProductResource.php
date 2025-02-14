<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'title' => $this->title,
        'image' => $this->image,
        'brand' => $this->brand,
        'description' => $this->description,
        'code' => $this->code,
        'categories' => $this->categories->isEmpty() ? null : $this->categories->pluck('type'),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}

}
