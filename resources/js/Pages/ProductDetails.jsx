import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the product ID from URL
import axios from 'axios'; // To make API requests

const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`); // Fetch product details from API
        setProduct(response.data.product); // Update state with product data
        setLoading(false); // Set loading to false
      } catch (err) {
        setError('Product not found'); // Set error if fetch fails
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-fetch if product ID changes

  // Show loading or error message if applicable
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Show product details when data is available
  return (
    <div className="max-w-4xl mx-auto p-6 md:w-full">
      <div className="flex flex-col items-center md:flex-row">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
        />

        <div className="md:ml-8 flex-1">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-600 mb-4">{product.brand}</p>
          
          {/* Product Description */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description || 'No description available'}</p>
          </div>

          {/* Product Code */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-2xl font-semibold mb-2">Product Code</h3>
            <p className="text-gray-700">{product.code || 'Code not available'}</p>
          </div>

          {/* Categories */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-2xl font-semibold mb-2">Categories</h3>
            <ul className="list-disc pl-5">
                
              {product.categories?.map((category, index) => (
                
                <li key={index} className="text-gray-700">{category}</li>
              ))}
            </ul>
          </div>

          {/* Created At */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-2xl font-semibold mb-2">Created At</h3>
            <p className="text-gray-700">{new Date(product.created_at).toLocaleString()}</p>
          </div>

          {/* Updated At */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h3 className="text-2xl font-semibold mb-2">Updated At</h3>
            <p className="text-gray-700">{new Date(product.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
