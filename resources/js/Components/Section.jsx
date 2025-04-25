import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Section = ({ category, products }) => {
  const [displayedProducts, setDisplayedProducts] = useState(products);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1960) {
        setDisplayedProducts(products.slice(0, 6)); // Very large screens: 6 products
      } else if (window.innerWidth >= 1024) {
        setDisplayedProducts(products.slice(0, 7)); // Large screens: 7 products
      } else if (window.innerWidth >= 768) {
        setDisplayedProducts(products.slice(0, 5)); // Medium screens: 5 products
      } else if (window.innerWidth < 768) {
        setDisplayedProducts(products.slice(0, 3)); // Small screens: 3 products
      } else {
        setDisplayedProducts(products);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  return (
    <div className="grid 
      grid-cols-2 gap-x-6 gap-y-6
      md:grid-cols-3 
      lg:grid-cols-4 
      3xl:grid-cols-7 
      mb-[7%] 3xl:mb-[7%] w-full px-6 md:px-8 ">
      
      {/* Category Box */}
      <Link to={`/products`} className="w-full">
      <div className="relative w-full h-full rounded-lg shadow-md overflow-hidden">
        <img
          src={category.image}
          alt="Category background"
          className="w-full h-full object-cover"
        />
        <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg md:text-2xl font-semibold text-light-background bg-light-text bg-opacity-50 p-2 rounded-lg font-Montserrat">
          {category?.type}
        </h2>
      </div>
      </Link>

      {/* Product Cards */}
      {displayedProducts.map((product) => (
        <div 
          key={product.id} 
          className="xxs:w-[115%] sm:w-full 3xl:max-h-[360px]"
        >
          <ProductCard variant='hover' product={product} />
        </div>
      ))}
    </div>
  );
};

export default Section;
