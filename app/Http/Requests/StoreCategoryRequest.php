<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Replace with your authorization logic
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string|max:15',
            'location' => 'required|string|max:15',
            'image' => 'required|file|image|max:2048', // Max 2MB
            'product_ids' => 'sometimes|array',
            'product_ids.*' => 'exists:products,id',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'type.required' => 'The category type is required.',
            'type.string' => 'The category type must be a string.',
            'type.max' => 'The category type must not exceed 15 characters.',
            'location.required' => 'The location type is required.',
            'location.string' => 'The location type must be a string.',
            'location.max' => 'The location type must not exceed 15 characters.',
            'image.required' => 'The image is required.',
            'image.file' => 'The image must be a valid file.',
            'image.image' => 'The image must be an image file (e.g., jpg, png).',
            'image.max' => 'The image must not exceed 2MB.',
            'product_ids.array' => 'The product IDs must be an array.',
            'product_ids.*.exists' => 'One or more product IDs are invalid.',
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