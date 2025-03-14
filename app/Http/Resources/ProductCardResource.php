<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductCardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->code,
            'name' => $this->name,
            'title'=> $this->title,
            'image' => $this->image,
            'brand' => $this->brand,
            'quantity' => $this->pivot ? $this->pivot->quantity : ($this->quantity ?? null), // Fallback to attached quantity
        ];
    }
}
