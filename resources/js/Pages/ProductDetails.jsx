import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaFileDownload, FaReceipt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';  
import Slider from 'react-slick';
import ProductCard from '../Components/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Components/Loading';

function App() {
  const { code } = useParams();
  const { data, loading, error } = useFetch(`/api/products/${code}`);
  const product = data && data.product && data.product.product;
  const relatedProducts = data && data.product && data.product.relatedProducts;

  // Initialize cart from sessionStorage
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    return storedCart;
  });

  // Initialize quantity based on cart or default to 0
  const [quantity, setQuantity] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const item = storedCart.find(item => item.id === code);
    return item ? item.quantity : 0;
  });

  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === code);
    const newQuantity = parseInt(quantity) || 0;

    if (existingItem) {
      if (newQuantity > 0) {
        setCart(cart.map(item =>
          item.id === code ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        setCart(cart.filter(item => item.id !== code));
      }
    } else if (newQuantity > 0) {
      setCart([...cart, { id: code, quantity: newQuantity }]);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = parseInt(quantity) + 1;
    setQuantity(newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = parseInt(quantity) - 1;
      setQuantity(newQuantity);
    }
  };


  const RelatedProductsSlider = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 425, settings: { slidesToShow: 1 } }
    ],
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-red-500 py-20">
          <p>Error loading sections: {error.message || 'Something went wrong'}</p>
          <button
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : data ? (
        <div className="min-h-screen bg-gray-50 pt-20">
          {/* Product Section */}
          <section className="container mx-auto px-2 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Product Image */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.id}
                    className="object-contain w-full h-full object-top"
                  />
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="lg:w-1/2 px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg mb-3">By <span className='text-blue-500'>{product.brand}</span></p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((category) => (
                    <span key={category} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer">{category}</span>
                  ))}
                </div>

                {/* Tabs */}
                <div className="mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                      <button
                        className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${activeTab === 'description' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('description')}
                      >
                        Description
                      </button>
                      <button
                        className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${activeTab === 'specifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('specifications')}
                      >
                        Specifications
                      </button>
                    </nav>
                  </div>
                  <div className="py-4">
                    {activeTab === 'description' && (
                      <div>
                        <p className="text-gray-700 mb-4">
                          {product.description}
                        </p>
                      </div>
                    )}
                    {activeTab === 'specifications' && (
                      <div className="overflow-x-visible">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Dimensions</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">3.5 × 2.2 × 0.8 inches</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Weight</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">75g</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Battery Life</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">Up to 24 months</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Water Resistance</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">IP67 rated</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Cart Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center">
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-1.5 sm:py-2 sm:px-6 rounded-md flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap mr-4"
                        onClick={() => handleAddToCart()}
                      >
                        <FaReceipt className="mr-2" />
                        Add to Pricing List
                      </button>
                      <div className="flex border border-gray-300 rounded-md">
                        <button
                          onClick={decrementQuantity}
                          className="px-1.5 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="w-12 text-center border-none focus:ring-0 text-gray-700"
                        />
                        <button
                          onClick={incrementQuantity}
                          className="px-1.5 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
                      <FaFileDownload className="mr-2" />
                      Download Datasheet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* People Also Like Section */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">People Also Like</h2>
            <div className="w-full">
              <Slider {...RelatedProductsSlider}>
                {relatedProducts.map((product) => (
                  <ProductCard variant="no-hover" product={product} key={product.id}/>
                ))}
              </Slider>
            </div>
          </section>
        </div>
      ) : (
        <div className="text-center text-gray-500 pt-20">No Product available</div>
      )}
    </>
  );
}

export default App;