import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For React Router (use 'next/link' for Next.js if needed)


const truncateText = (text, maxLength = 20) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
const ProductCard = ({ variant = "hover", product }) => {
  const [responsiveVariant, setResponsiveVariant] = useState(variant);

  useEffect(() => {
    // Function to check screen width and update the variant
    const handleResize = () => {
      if (window.innerWidth <= 440) {
        setResponsiveVariant("no-hover");
      } else if (window.innerWidth <= 768) {
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
        className=" min-h-36 xxs:h-[200px] sm:h-[300px] lg:h-[310px] xl:h-[356px] 2xl:h-[400px] 
        group relative rounded-lg overflow-hidden mx-1 shadow-md border border-light-secondary bg-white transition-all duration-300 ease-linear dark:bg-dark-background dark:border-dark-secondary"
      >
        {/* Picture */}
        <div
          className={`w-full sm:h-[90%] xxs:h-[80%] p-3 transition-all duration-300 ease-linear ${
            responsiveVariant === "hover" ? "group-hover:pb-6" : "pb-1 sm:pb-6"
          }`}
        >
          <img
            src={product.image}// Use image from product
            alt={product.title} // Use title as alt text
            className={`w-full xxs:h-[90%] md:h-[95%] object-contain rounded-lg transition-all duration-150 ease-linear ${
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
          className={`w-full bg-white px-6 md:pr-2 md:pl-4 pb-6 flex flex-col shadow-md transition-all duration-300 ease-linear relative dark:bg-dark-background ${
            responsiveVariant === "hover"
              ? "group-hover:-translate-y-[40px]"
              : responsiveVariant === "static"
              ? "sm:-translate-y-[40px]"
              : ""
          }`}
        >
          {/* Name & Code */}
          <div className="flex flex-col sm:flex-row justify-between w-full items-center">
            <h3 className="xl:text-2xl text-sm font-SulphurPoint dark:text-dark-text">{product.name}</h3>
            <p className="md:text-base text-[10px] text-gray-500 font-SulphurPoint dark:text-dark-secondary2">#{product.id}</p>
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
              <h3 className="xxs:text-xs text-sm font-SulphurPoint text-light-text dark:text-dark-text">{truncateText(product.title)}</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-light-secondary2 font-SulphurPoint dark:text-dark-secondary2 xxs:opacity-0 sm:opacity-100">Lorem ipsum sit amet. Lorem ipsum sit amet.</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
