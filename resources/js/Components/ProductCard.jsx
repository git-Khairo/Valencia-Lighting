import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className=" relative block p-4 hover:scale-[1.02] transition-transform duration-300  w-full h-full md:w-full"
    >
      <div className=" flex flex-col md:flex-row md:w-full items-center justify-center m-0">
        
        {/* Image */}
        <div className="md:absolute md:transform md:-translate-x-[95%] rounded-lg md:w-2/5 flex justify-center border-2 -z-10">
          <img
            className="bg-transparent shadow-xl rounded-full md:rounded-xl w-full object-cover "
            src="./build/assets/new.png"
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="flex justify-center flex-col bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text w-full h-auto md:h-64 border-4 p-6 mt-12 md:mt-0 -z-20">
          <div className="flex flex-col items-center justify-center h-full">
            
            {/* Title & Name */}
            <h1 className="text-light-primary dark:text-dark-primary text-base md:text-xl font-bold mb-2 md:mb-4 pl-9 md:pl-20">
              {product.name}
            </h1>
            <h2 className="text-light-primary dark:text-dark-primary text-sm md:text-base font-normal pl-9 md:pl-20">
              {product.title}
            </h2>

            {/* Buttons */}
            <div className="mt-4 md:mt-8 pl-9 flex items-center gap-3  md:pl-20 md:gap-4">
              <button className="flex items-center justify-center rounded-full transition-all w-8 h-8 md:w-[50px] md:h-[50px]">
                <i className="z-10 text-lg md:text-2xl border-4 bg-[#879eb6] rounded-full w-full h-full grid place-items-center hover:bg-[#5f89b7]" />
              </button>
              <button className="flex items-center justify-center bg-transparent w-8 h-8 md:w-[50px] md:h-[50px]">
                <i className="z-10 text-lg md:text-2xl border-4 bg-[#879eb6] rounded-full w-full h-full grid place-items-center hover:bg-[#5f89b7]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;
