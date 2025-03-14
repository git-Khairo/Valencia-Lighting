<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
        $productId = $this->route('id'); // Get the product ID from the route parameter

        return [
            'name' => 'sometimes|string|max:15',
            'title' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|nullable|string',
            'brand' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|nullable|string|max:255',
            'dateOfRelease' => 'sometimes|nullable|date',
            'code' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('products', 'code')->ignore($productId), // Unique except for this product
            ],
            'category_ids' => 'sometimes|array',
            'category_ids.*' => 'exists:categories,id', // Each ID must exist in categories table
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.string' => 'The product name must be a string.',
            'code.unique' => 'This product code is already in use by another product.',
            'category_ids.*.exists' => 'One or more category IDs are invalid.',
        ];
    }
}