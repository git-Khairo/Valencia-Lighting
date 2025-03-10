<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Adjust as needed
    }

    public function rules()
{
    return [
        'firstName' => 'required|string|max:255',
        'lastName' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:orders,email',
        'phone' => 'required|string|max:20',
        'products' => 'required|array',
        'products.*.product_id' => 'required|exists:products,id',
        'products.*.quantity' => 'required|integer|min:1',
    ];
}


    public function messages()
    {
        return [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:orders,email',
            'phone' => 'required|string|regex:/^(\+?[0-9]{1,3})?([0-9]{10})$/',
            'products' => 'required|array',  // Ensure products is an array
            'products.*.product_id' => 'required|exists:products,id',  // Validate product_id exists
            'products.*.quantity' => 'required|integer|min:1',  // Ensure quantity is an integer and > 0
        ];
    }
}
