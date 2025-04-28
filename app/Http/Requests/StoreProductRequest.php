<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class StoreProductRequest extends FormRequest
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
            'name' => 'required|string',
            'title' => 'required|string|max:255',
            'material' => 'required|string|max:255',
            'productNumber' => 'required|string|max:255',
            'length' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'accessories' => 'required|string|max:255',
            'description' => 'required|string',
            'brand' => 'required|string|max:255',
            'image' => 'required|file|image|max:2048', // Max 2MB
            'dateOfRelease' => 'required|date',
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'code'),
            ],
            'datasheet' => 'required|file|mimes:pdf|max:10240', // Max 10MB
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
            'title.required' => 'The title is required.',
            'title.string' => 'The title must be a string.',
            'title.max' => 'The title must not exceed 255 characters.',
            'material.required' => 'The title is required.',
            'material.string' => 'The title must be a string.',
            'material.max' => 'The title must not exceed 255 characters.',
            'productNumber.required' => 'The title is required.',
            'productNumber.string' => 'The title must be a string.',
            'productNumber.max' => 'The title must not exceed 255 characters.',
            'length.required' => 'The title is required.',
            'length.string' => 'The title must be a string.',
            'length.max' => 'The title must not exceed 255 characters.',
            'color.required' => 'The title is required.',
            'color.string' => 'The title must be a string.',
            'color.max' => 'The title must not exceed 255 characters.',
            'accessories.required' => 'The title is required.',
            'accessories.string' => 'The title must be a string.',
            'accessories.max' => 'The title must not exceed 255 characters.',
            'description.required' => 'The description is required.',
            'description.string' => 'The description must be a string.',
            'brand.required' => 'The brand is required.',
            'brand.string' => 'The brand must be a string.',
            'brand.max' => 'The brand must not exceed 255 characters.',
            'image.required' => 'The image is required.',
            'image.file' => 'The image must be a valid file.',
            'image.image' => 'The image must be an image file (e.g., jpg, png).',
            'image.max' => 'The image must not exceed 2MB.',
            'dateOfRelease.required' => 'The date of release is required.',
            'dateOfRelease.date' => 'The date of release must be a valid date.',
            'code.required' => 'The product code is required.',
            'code.string' => 'The product code must be a string.',
            'code.max' => 'The product code must not exceed 255 characters.',
            'code.unique' => 'This product code is already in use.',
            'datasheet.required' => 'The datasheet is required.',
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