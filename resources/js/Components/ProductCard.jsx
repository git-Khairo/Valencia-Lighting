import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For React Router (use 'next/link' for Next.js if needed)

const ProductCard = ({ variant = "hover", product }) => {
  const [responsiveVariant, setResponsiveVariant] = useState(variant);

  useEffect(() => {
    // Function to check screen width and update the variant
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setResponsiveVariant("static");
      } else {
        setResponsiveVariant(variant);
      }
    };

    // Initial check & event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [variant]); // Re-run effect if variant changes

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div
        className="xxs:h-[200px] small:h-[240px] xs:h-[280px] sm:h-[340px] md:h-[300px] lg:h-[310px] xl:h-[356px] 2xl:h-[400px] 
        group relative rounded-lg overflow-hidden mx-1 shadow-md border border-gray-200 bg-white transition-all duration-300 ease-linear"
      >
        {/* Picture */}
        <div
          className={`w-full sm:h-[90%] xxs:h-[80%] p-3 transition-all duration-300 ease-linear ${
            responsiveVariant === "hover" ? "group-hover:pb-6" : "pb-6"
          }`}
        >
          <img
            src="build/assets/hhh.webp" // Use image from product
            alt={product.title} // Use title as alt text
            className={`w-full xxs:h-[80%] md:h-[95%] object-cover rounded-lg transition-all duration-150 ease-linear ${
              responsiveVariant === "hover"
                ? "group-hover:h-[90%]"
                : responsiveVariant === "static"
                ? "h-[90%]"
                : ""
            }`}
          />
        </div>

        {/* Visible Part + Extra Details */}
        <div
          className={`w-full bg-white px-6 pb-6 flex flex-col shadow-md transition-all duration-300 ease-linear relative ${
            responsiveVariant === "hover"
              ? "group-hover:-translate-y-[40px]"
              : responsiveVariant === "static"
              ? "-translate-y-[40px]"
              : ""
          }`}
        >
          {/* Name & Code */}
          <div className="flex justify-between w-full items-center">
            <h3 className="sm:text-lg xxs:text-sm font-semibold">{product.name}</h3>
            <p className="sm:text-base xxs:text-xs text-gray-500">#{product.id}</p>
          </div>

          {/* Extra Details */}
          <div
            className={`transition-all duration-300 ease-linear flex flex-col ${
              responsiveVariant === "hover"
                ? "h-[10%] overflow-hidden opacity-0 group-hover:opacity-100"
                : responsiveVariant === "static"
                ? "h-[40%] opacity-100"
                : "hidden"
            }`}
          >
            <div className="flex xxs:flex-col sm:flex-row justify-between items-center">
              <h3 className="xxs:text-xs xs:text-sm font-semibold">{product.title}</h3>
              <button
                className="inline-flex items-center font-normal xxs:text-[10px] xs:text-sm text-blue-600 hover:text-blue-800"
                onClick={(e) => e.preventDefault()} // Prevent default link behavior inside Link
              >
                Add to cart
                <svg
                  className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 xxs:opacity-0 sm:opacity-100">Lorem ipsum sit amet.</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;