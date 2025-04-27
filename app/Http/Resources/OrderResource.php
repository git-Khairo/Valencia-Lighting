<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
            'address'=>$this->address,
            'phone' => $this->phone,
            'created_at' => $this->created_at, // Optional: format date
            'products' => ProductCardResource::collection($this->products),
        ];
    }
}