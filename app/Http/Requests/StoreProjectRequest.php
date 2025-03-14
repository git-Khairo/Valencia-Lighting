<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'image' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'dateOfProject' => 'nullable|date',
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
            'product_ids.*.exists' => 'One or more product IDs are invalid.',
        ];
    }
}