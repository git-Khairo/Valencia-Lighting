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
            'image' => $this->image,
            'dateOfRelease' => $this->dateOfRelease,
            'code' => $this->code,
            'categories' => $this->categories->pluck('type'), // Simple list of category names
            'projects' => $this->projects->pluck('title'),     // Simple list of project names
            'orders' => $this->orders->map(function ($order) {
                return [
                    'order_id' => $order->id,
                    'quantity' => $order->pivot->quantity,
                ];
            }),
        ];
    }
}