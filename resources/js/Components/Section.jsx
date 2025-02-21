import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';


const Section = ({ category , products }) => {

  return (
    <div 
      className="flex flex-wrap justify-center gap-8 w-full md:items-center"
      style={{ margin: "0 0% 5% 0%" }}
    >
      {/* Category Box */}
      <Link to={`/products`}>
      <div className="h-96 bg-blue-500 text-white p-6 rounded-lg shadow-md w-full md:w-[22.5%] min-w-[250px]">
        <h2 className="text-2xl font-semibold">{category.type}</h2>
      </div>
      </Link>

      {/* Product Cards */}
      {products.map((product) => (
        <div 
          key={product.id}
          className="w-full md:w-[22.5%] min-w-[250px] h-auto"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default Section;
