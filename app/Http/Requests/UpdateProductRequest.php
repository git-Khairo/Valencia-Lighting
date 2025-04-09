<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class UpdateProductRequest extends FormRequest
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
        $code = $this->route('code'); // Get the product code from the route parameter

        return [
            'name' => 'sometimes|required|string|max:15',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'brand' => 'sometimes|required|string|max:255',
            'dateOfRelease' => 'sometimes|required|date',
            'code' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'code')->ignore($code),
            ],
            'datasheet' => 'sometimes|file|mimes:pdf|max:10240', // Max 10MB
            'category_ids' => 'sometimes|array',
            'category_ids.*' => 'exists:categories,id',
            'project_ids' => 'sometimes|array',
            'project_ids.*' => 'exists:projects,id',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The product name is required.',
            'name.string' => 'The product name must be a string.',
            'name.max' => 'The product name must not exceed 15 characters.',
            'title.required' => 'The title is required.',
            'title.string' => 'The title must be a string.',
            'title.max' => 'The title must not exceed 255 characters.',
            'description.required' => 'The description is required.',
            'description.string' => 'The description must be a string.',
            'brand.required' => 'The brand is required.',
            'brand.string' => 'The brand must be a string.',
            'brand.max' => 'The brand must not exceed 255 characters.',
            'image.file' => 'The image must be a valid file.',
            'image.image' => 'The image must be an image file (e.g., jpg, png).',
            'image.max' => 'The image must not exceed 2MB.',
            'dateOfRelease.required' => 'The date of release is required.',
            'dateOfRelease.date' => 'The date of release must be a valid date.',
            'code.required' => 'The product code is required.',
            'code.string' => 'The product code must be a string.',
            'code.max' => 'The product code must not exceed 255 characters.',
            'code.unique' => 'This product code is already in use by another product.',
            'datasheet.file' => 'The datasheet must be a valid file.',
            'datasheet.mimes' => 'The datasheet must be a PDF file.',
            'datasheet.max' => 'The datasheet must not exceed 10MB.',
            'category_ids.array' => 'The category IDs must be an array.',
            'category_ids.*.exists' => 'One or more category IDs are invalid.',
            'project_ids.array' => 'The project IDs must be an array.',
            'project_ids.*.exists' => 'One or more project IDs are invalid.',
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
