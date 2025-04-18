<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class StoreProjectRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'images' => 'required|array', // Max 2MB
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
            'image.required' => 'The image is required.',
            'image.file' => 'The image must be a valid file.',
            'image.image' => 'The image must be an image file (e.g., jpg, png).',
            'image.max' => 'The image must not exceed 2MB.',
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