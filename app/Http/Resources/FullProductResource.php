<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FullProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'title' => $this->title,
            'description' => $this->description,
            'brand' => $this->brand,
            'material' => $this->material,
            'accessories' => $this->accessories,
            'productNumber' => $this->productNumber,
            'length' => $this->length,
            'color' => $this->color,
            'image' => $this->image,
            'dateOfRelease' => $this->dateOfRelease,
            'code' => $this->code,
            'categories' => $this->categories->map(function ($project) {
                return ['id' => $project->id, 'type' => $project->title];
            }),
            'projects' => $this->projects->map(function ($project) {
                return ['id' => $project->id, 'title' => $project->title];
            }),
            'orders' => $this->orders->map(function ($order) {
                return [
                    'order_id' => $order->id,
                    'quantity' => $order->pivot->quantity,
                ];
            }),
        ];
    }
}
