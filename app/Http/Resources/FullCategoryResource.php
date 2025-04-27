<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FullCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'location' => $this->location,
            'image' => $this->image,
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