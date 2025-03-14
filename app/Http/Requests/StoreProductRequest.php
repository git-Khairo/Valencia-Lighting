<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Adjust authorization logic as needed (e.g., check user permissions)
        return true; // For now, allow all requests; replace with auth logic if required
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:15',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'dateOfRelease' => 'nullable|date',
            'code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'code'), // Ensure code is unique in the products table
            ],
            'category_id' => 'sometimes|array',
            'category_id.*' => 'exists:categories,id', // Each ID must exist in categories table
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The product name is required.',
            'code.required' => 'The product code is required.',
            'code.unique' => 'This product code is already in use.',
            'category_ids.*.exists' => 'One or more category IDs are invalid.',
        ];
    }
}