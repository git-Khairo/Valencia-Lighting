<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
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
            'email' => 'required|email|max:255',
            'phone' => 'required|string|regex:/^(\+?[0-9]{1,3})?([0-9]{10})$/',
            'products' => 'required|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ];
    }

    public function messages()
    {
        return [
            'firstName.required' => 'The first name is required.',
            'firstName.string' => 'The first name must be a string.',
            'firstName.max' => 'The first name can not be longer than 255 characters.',

            'lastName.required' => 'The last name is required.',
            'lastName.string' => 'The last name must be a string.',
            'lastName.max' => 'The last name can not be longer than 255 characters.',

            'email.required' => 'The email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.max' => 'The email address can not be longer than 255 characters.',

            'phone.required' => 'The phone number is required.',
            'phone.string' => 'The phone number must be a string.',
            'phone.regex' => 'The phone number format is invalid. Please use a valid format (e.g., +123456789012 or 1234567890).',

            'products.required' => 'At least one product is required to place an order.',
            'products.array' => 'The products must be provided as an array.',

            'products.*.product_id.required' => 'Each product must have a product ID.',
            'products.*.product_id.exists' => 'One or more selected products do not exist.',

            'products.*.quantity.required' => 'Each product must have a quantity specified.',
            'products.*.quantity.integer' => 'The quantity must be a whole number.',
            'products.*.quantity.min' => 'The quantity must be at least 1.',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
       // Convert all error messages into a single string
       $errorMessage = implode(' ', $validator->errors()->all());

       throw new HttpResponseException(response()->json([
           'message' => $errorMessage,
       ], 422)); // 422 Unprocessable Entity
    }
}
