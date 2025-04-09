<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class UpdateCategoryRequest extends FormRequest
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
        'type' => 'sometimes|required|string|max:15',
        'images' => 'required|array',
        'images.*' => 'file|image|max:2048', // Validate each image
        'description' => 'required|string',
        'dateOfProject' => 'required|date',
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
        'title.required' => 'The project title is required.',
        'title.string' => 'The project title must be a string.',
        'title.max' => 'The project title must not exceed 255 characters.',
        'images.required' => 'At least one image is required.',
        'images.array' => 'The images must be an array.',
        'images.*.file' => 'Each image must be a valid file.',
        'images.*.image' => 'Each image must be an image file (e.g., jpg, png).',
        'images.*.max' => 'Each image must not exceed 2MB.',
        'description.required' => 'The description is required.',
        'description.string' => 'The description must be a string.',
        'dateOfProject.required' => 'The date of project is required.',
        'dateOfProject.date' => 'The date of project must be a valid date.',
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