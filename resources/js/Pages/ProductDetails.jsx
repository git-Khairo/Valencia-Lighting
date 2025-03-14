import { useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the product ID from URL
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import useFetch from '../useFetch';

import ProductCard from '../Components/ProductCard';
import Slider from 'react-slick';
const ProductDetails = () => {
  const { code } = useParams(); // Extract the product ID from the URL
  const { data, error, loading } = useFetch(`/api/products/${code}`);
  let images = [];

  
  if(data.product){
    images = [data.product.product.image, data.product.product.image, data.product.product.image, data.product.product.image, data.product.product.image];
  }

  const ProductSliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 425, settings: { slidesToShow: 1 } }
    ],
  };
  
  
  
  const [currentIndex, setCurrentIndex] = useState(0);  

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };
  

  // Show product details when data is available
    return (
      <>
      {loading ? (
      <div className="text-center text-gray-500">Loading sections...</div>
    ) : error ? (
      <div className="text-center text-red-500 py-5">
        <p>Error loading Project: {error.message || 'Something went wrong'}</p>
        <button
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    ) : data && data.product ? (
      <div className='max-w-[2560px] mx-auto w-full flex flex-col py-16'>  
          <div className="flex flex-col lg:flex-row items-center lg:items-start p-4
           md:p-6 gap-0 lg:gap-20 xl:gap-32 3xl:gap-10 mx-2 md:mx-6 xl:mx-16 w-full">
          {/* Left - Image Carousel */}
          <div className="xl:w-[80%] sm:w-[90%] xxs:w-[110%] h-full 3xl:h-[150%] shadow-2xl rounded-lg relative">
            <div
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
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
                  src={image}
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
            <h1 className=" sm:text-xl md:text-2xl 3xl:text-2xl font-bold">{data.product.product.name}</h1>
            <p className="3xl:text-3xl sm:text-base md:text-lg text-gray-500">Category: {data.product.product.categories}</p>
            <p className="3xl:text-3xl sm:text-base md:text-lg text-gray-700">
             {data.product.product.description}
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
               </thead>
             </table>
            </div>
          </div>
          </div>
            
      {/* People Also Liked */}
      <div className="w-full mt-10 px-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">People Also Liked</h2>
        <div className="w-full">
        <Slider {...ProductSliderSettings}>
          {data.product.relatedProducts.map((relatedProduct, index) => (
            <ProductCard variant="no-hover" product={relatedProduct} key={relatedProduct.id} />
          ))}
        </Slider>
        </div>
      </div>
        </div>
    ) : (
      <div className="text-center text-gray-500">Product Not Found</div>
    )}
        </>
      );
    };

export default ProductDetails;
