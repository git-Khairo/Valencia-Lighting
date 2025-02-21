import React from 'react';
import ProductCard from './ProductCard';

const Section = ({ section }) => {
  const { category_name, products } = section;

  return (
    <div 
      className="flex flex-wrap justify-center gap-8 w-full md:items-center"
      style={{ margin: "0 3% 5% 3%" }}
    >
      {/* Category Box */}
      <div className="h-96 bg-blue-500 text-white p-6 rounded-lg shadow-md w-full md:w-[22.5%] min-w-[250px]">
        <h2 className="text-2xl font-semibold">{category_name}</h2>
      </div>

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
