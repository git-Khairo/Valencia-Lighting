import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaFileDownload, FaReceipt, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../useFetch';  
import Slider from 'react-slick';
import ProductCard from '../Components/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Components/Loading';

function App() {
  const { code } = useParams();
  const { data, loading, error } = useFetch(`/api/products/${code}`);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const product = data && data.product && data.product.product;
  const relatedProducts = data && data.product && data.product.relatedProducts;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

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

  const downloadDatasheet = async (productId) => {
    try {
      setDownloadLoading(true);
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ code: productId }),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary <a> tag to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.name || 'datasheet'}.pdf`; // Fallback name if productName is undefined
      document.body.appendChild(a);
      a.click();
      setDownloadLoading(false);
  
      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
      alert('Failed to download datasheet.');
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

  console.log(product);

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
        <div className="min-h-screen bg-light-background dark:bg-dark-background pt-20">
          <FaArrowLeft size={25} className='mx-5 cursor-pointer text-light-text dark:text-dark-text' onClick={handleBack}/>
          {/* Product Section */}
          <section className="container mx-auto px-2 pb-8 pt-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Product Image */}
              <div className="lg:w-1/2">
                <div className="bg-light-background dark:bg-dark-background rounded-lg overflow-hidden shadow-lg flex items-center justify-center p-1">
                  <img
                    src={product.image}
                    alt={product.id}
                    className="object-contain w-full h-full object-top rounded-lg"
                  />
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="lg:w-1/2 px-4">
                <h1 className="text-3xl font-Montserrat text-light-text dark:text-dark-text mb-2">{product.name}</h1>
                <p className="text-light-text dark:text-dark-text text-lg mb-3 font-SulphurPoint">By <span className='text-light-primary dark:text-dark-primary font-bold font-SulphurPoint'>{product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</span></p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories && product.categories.map((category) => (
                    <span key={category} className="dark:bg-dark-primary bg-light-accent text-light-text dark:text-dark-text text-sm font-SulphurPoint px-3 py-1 rounded-full cursor-pointer">{category}</span>
                  ))}
                </div>

                {/* Tabs */}
                <div className="mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                      <button
                        className={`py-4 px-1 border-b-2 font-Montserrat text-sm cursor-pointer whitespace-nowrap ${activeTab === 'description' ? 'border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary ' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('description')}
                      >
                        Description
                      </button>
                      <button
                        className={`py-4 px-1 border-b-2 font-Montserrat text-sm cursor-pointer whitespace-nowrap ${activeTab === 'specifications' ? 'border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary ' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        onClick={() => setActiveTab('specifications')}
                      >
                        Specifications
                      </button>
                    </nav>
                  </div>
                  <div className="py-4">
                    {activeTab === 'description' && (
                      <div>
                        <p className="text-light-text dark:text-dark-text mb-4 font-Jura">
                          {product.description}
                        </p>
                      </div>
                    )}
                    {activeTab === 'specifications' && (
                      <div className="overflow-x-visible">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500">
                          <thead className="bg-light-background dark:bg-dark-background">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                          </thead>
                          <tbody className="bg-light-[#f5f5f5] divide-y divide-gray-200 dark:divide-dark-background dark:bg-dark-background2">
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-Montserrat text-gray-900 dark:text-dark-text">Dimensions</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-base md:text-sm text-dark-secondary dark:text-light-secondary font-SulphurPoint">{product.length}</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-Montserrat text-gray-900 dark:text-dark-text">Color</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-sm text-dark-secondary dark:text-light-secondary font-SulphurPoint">{product.color}</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-Montserrat text-gray-900 dark:text-dark-text">Material</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-sm text-dark-secondary dark:text-light-secondary font-SulphurPoint">{product.material}</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-Montserrat text-gray-900 dark:text-dark-text">Accessories</td>
                              <td className="px-2 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-sm text-dark-secondary dark:text-light-secondary font-SulphurPoint">{product.accessories}</td>
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
                        className="bg-light-primary dark:bg-dark-primary hover:bg-[#00437ae3] dark:hover:bg-[#96c2e3d4] text-white py-1 px-1.5 sm:py-2 sm:px-6 rounded-md flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap mr-2 font-Jura"
                        onClick={() => handleAddToCart()}
                      >
                        <FaReceipt className="mr-2" />
                        Add to Pricing List
                      </button>
                      <div className="flex border border-gray-300 dark:border-gray-500 rounded-md">
                        <button
                          onClick={decrementQuantity}
                          className="px-2 py-1.5 sm:py-2 dark:bg-dark-secondary2 cursor-pointer rounded-tl-md rounded-bl-md"
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="text"
                          id="quantity"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="w-10 text-center focus:ring-0 bg-light-background2 font-Montserrat"
                        />
                        <button
                          onClick={incrementQuantity}
                          className="px-2 py-1.5 sm:py-2 dark:bg-dark-secondary2 cursor-pointer rounded-tr-md rounded-br-md"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <button disabled={downloadLoading} className="border border-gray-300 dark:border-none bg-light-primary dark:bg-dark-primary hover:bg-[#00437ae3] dark:hover:bg-[#96c2e3d4] text-white py-2 px-6 rounded-md flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap font-Jura" onClick={() => downloadDatasheet(product.id)}>
                    {downloadLoading ? <div className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-1.5"></div> : <></>}
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
            <h2 className="text-3xl font-Montserrat text-light-primary dark:text-dark-primary border-b pb-3 border-light-primary dark:border-dark-primary mb-6">People Also Like</h2>
            {relatedProducts.length > 2 ? (
            <div className="w-full">
              <Slider {...RelatedProductsSlider}>
                {relatedProducts.map((product) => (
                  <ProductCard variant="no-hover" product={product} key={product.id}/>
                ))}
              </Slider>
            </div>
               ) : (
                <div className='w-fit mx-auto md:flex'>
                  {relatedProducts.map((product) => (
                  <ProductCard variant="no-hover" product={product} key={product.id}/>
                  ))}
                </div>
              )}
          </section>
        </div>
      ) : (
        <div className="text-center text-gray-500 pt-20">No Product available</div>
      )}
    </>
  );
}

export default App;