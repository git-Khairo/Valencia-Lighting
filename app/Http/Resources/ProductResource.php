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
        'id' => $this->code,
        'name' => $this->name,
        'title' => $this->title,
        'image' => $this->image,
        'brand' => $this->brand,
        'description' => $this->description,
        'code' => $this->code,
        'categories' => $this->categories->isEmpty() ? null : $this->categories->pluck('type'),
        'date' => $this->created_at,
        ];
}

}
