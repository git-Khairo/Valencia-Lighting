<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // For testing, allow all requests; replace with real auth logic later
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'type' => 'sometimes|string|max:15',
            'image' => 'sometimes|nullable|string|max:255',
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
            'type.string' => 'The project title must be a string.',
            'product_ids.*.exists' => 'One or more product IDs are invalid.',
        ];
    }
}