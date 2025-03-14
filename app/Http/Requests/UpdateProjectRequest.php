<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'title' => 'sometimes|string|max:255',
            'image' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|nullable|string',
            'dateOfProject' => 'sometimes|nullable|date',
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
            'title.string' => 'The project title must be a string.',
            'product_ids.*.exists' => 'One or more product IDs are invalid.',
        ];
    }
}