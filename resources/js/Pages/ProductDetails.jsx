import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the product ID from URL
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

import ProductCard from '../Components/ProductCard';
const ProductDetails = () => {
  const { code } = useParams(); // Extract the product ID from the URL
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const images = [
    { url: "/build/assets/testers/1.jpg" },
    { url: "/build/assets/testers/2.jpg" },
    { url: "/build/assets/testers/3.jpg" },
    { url: "/build/assets/testers/4.jpg" },
    { url: "/build/assets/testers/5.jpg" },
    { url: "/build/assets/testers/6.jpg" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);  
 

  

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${code}`); // Full URL for clarity
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Product not found');
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products/${code}/related`);
        if (!response.ok) {
          throw new Error('Related products not found');
        }
        const data = await response.json();
        setRelatedProducts(data.products); // Set the 'products' array from the response
      } catch (err) {
        console.error('Error fetching related products:', err);
          setRelatedProducts([]); // Set empty array on error to avoid breaking the UI
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [code]); // Re-fetch if product ID changes

  // Show loading or error message if applicable
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(product);
  console.log('Related Products:', relatedProducts);
  console.log(error);

  if (error) {
    return <div>{error}</div>;
  }
  if (!product) {
    return <div>No product data available</div>;
  }
  

  // Show product details when data is available
    return (
      <div className='max-w-[2560px] mx-auto w-full flex flex-col mt-16'>  
          <div className="flex flex-col lg:flex-row items-center lg:items-start p-4
           md:p-6 gap-0 lg:gap-20 xl:gap-32 3xl:gap-10 mx-2 md:mx-6 xl:mx-16 w-full">
          {/* Left - Image Carousel */}
          <div className="xl:w-[80%] sm:w-[90%] xxs:w-[110%] h-full 3xl:h-[150%] shadow-2xl rounded-lg relative">
            <div
              style={{ backgroundImage: `url(${images[currentIndex].url})` }}
              className="w-full h-80 sm:h-[500px] 3xl:h-[850px] rounded-lg bg-center bg-cover duration-500"
            ></div>
    
            {/* Left Arrow */}
            <div
              className="hidden md:block absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-black/20 text-white rounded-full cursor-pointer"
              onClick={prevSlide}
            >
              <GoChevronLeft size={30} />
            </div>
    
            {/* Right Arrow */}
            <div
              className="hidden md:block absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-black/20 text-white rounded-full cursor-pointer"
              onClick={nextSlide}
            >
              <GoChevronRight size={30} />
            </div>
    
            {/* Thumbnail Navigation */}
            <div className="flex justify-center py-3 3xl:py-8 gap-2 w-full md:h-[150px]">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Slide ${index}`}
                  className={`w-12 h-12 xl:w-32 xl:h-32 rounded-md cursor-pointer object-cover 
                    ${currentIndex === index ? "border-2 border-blue-500" : "opacity-50"}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
    
          {/* Right - Product Details */}
          <div className=" flex flex-col md:items-center lg:items-start space-y-4 px-8 pt-20">
            <h1 className=" sm:text-xl md:text-2xl 3xl:text-2xl font-bold">Pink Foam</h1>
            <p className="3xl:text-3xl sm:text-base md:text-lg text-gray-500">Category: NOCTA Air Force 1</p>
            <p className="3xl:text-3xl sm:text-base md:text-lg text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione in nam distinctio vel quasi voluptates.
            </p>
            <button className="md:w-1/2 3xl:w-1/4 3xl:text-3xl p-5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-900 transition">
              Add to Cart
            </button>
    
            <hr />
    
            {/* Labels */}
            <div className="flex flex-wrap items-center gap-2 3xl:pt-20">
              {["IP44", "A++", "FLUX 90lm/W", "CRI 80/90"].map((label, index) => (
                <span key={index} className="px-3 py-1 bg-gray-300 text-black rounded-full 3xl:text-2xl font-semibold border border-black">
                  {label}
                </span>
              ))}
            </div>
    
            {/* Table */}
            <div className="w-full bg-white rounded-lg">
            <table className="w-[90%] h-full border-collapse text-sm ">
               <thead>
                 <td>
                   <tr className="p-3 text-left">
                     <th className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 text-gray-700 border-b border-r border-[#a3a3a3]"> Model No.</th>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-r border-[#a3a3a3]">RDS-013-76</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-r border-[#a3a3a3]">RDS-013-96</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-[#a3a3a3]">RDS-013-125</td>
                   </tr>
                   <tr className="p-3 text-left">
                     <th className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-4 text-gray-700 border-b border-r border-[#a3a3a3]"> Size </th>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-r border-[#a3a3a3]">D76*H61mm</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-r border-[#a3a3a3]">D96*H80mm</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-[#a3a3a3]">D125*H105mm</td>
                   </tr>
                   <tr className="p-3 text-left">
                     <th className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-4 text-gray-700 border-b border-r border-[#a3a3a3]">Cut-Out</th>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-r border-[#a3a3a3]">65mm</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-b border-r border-[#a3a3a3]">85mm</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1sm:p-3 border-b border-[#a3a3a3]">110mm</td>
                   </tr>
                   <tr className="p-3 text-left">
                     <th className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-4 text-gray-700 border-r border-[#a3a3a3]">Power</th>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-r border-[#a3a3a3]">5W, 8W</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-r border-[#a3a3a3]">8W, 12W</td>
                     <td className="text-xs sm:text-sm 3xl:text-2xl p-1 sm:p-3 border-[#a3a3a3]">18W, 20W</td>
                   </tr>
                 </td>
               </thead>
             </table>
            </div>
          </div>
          </div>
            
      {/* People Also Liked */}
      <div className="w-full mt-10 px-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">People Also Liked</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-7 mb-[7%] 3xl:mb-[7%] w-full px-6 md:px-8">
          {relatedProducts.map((relatedProduct, index) => (
            <div key={index} className="w-full">
              <ProductCard variant="no-hover" product={relatedProduct} />
            </div>
          ))}
        </div>
      </div>
        </div>
      );
    };

export default ProductDetails;
