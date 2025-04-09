<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FullProjectResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'image' => $this->image,
            'description' => $this->description,
            'dateOfProject' => $this->dateOfProject,
            'products' => $this->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'code' => $product->code
                ];
            }),
        ];
    }
}