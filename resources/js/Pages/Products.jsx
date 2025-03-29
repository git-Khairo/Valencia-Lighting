import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  { id: 1, image: "https://picsum.photos/200" },
  { id: 2, image: "https://picsum.photos/200"  },
  { id: 3, image: "https://picsum.photos/200"  },
  { id: 4, image: "https://picsum.photos/200"  },
  
];

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(24); // Keep posts per page constant

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState("");

  const updateFilter = (categoryID) => {
    if(categories.find((id) => id === categoryID )){
      setCategories(categories.filter(id => id !== categoryID));
    }else{
      setCategories([...categories, categoryID]);
    }
  }
  

  useEffect(() => {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "categories": categories,
        "brand": brand
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [brand, categories]);
 
   // **Reset to page 1 when data changes to avoid empty pages**
   useState(() => {
     setCurrentPage(1);
   }, [data]);
   

   // **Pagination logic**
   const lastPostIndex = currentPage * postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
   const currentPosts = data && data.products.slice(firstPostIndex, lastPostIndex);


   const ProductSliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 425, settings: { slidesToShow: 1 } },
    ],
  };
 
  return (
    <div className="w-full m-0 md:w-full md:h-full px-6 md:px-8">
      {/* Slider Section */}
      <section className="mx-auto px-10 py-20 flex flex-col md:flex-row items-center gap-6">
      {/* Left Section */}
      <div className="md:w-1/3 text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-900 font-serif md:text-3xl">
          Popular Products
        </h2>
        <p className="mt-4 text-gray-600 text-xs sm:text-xl md:lg">
          Time is like a sword, if you don't cut it, It will.
        </p>
      </div>

      {/* Right Side Image Slider */}
      <div className="md:w-2/3 w-full">
        <Slider {...ProductSliderSettings}>
          {products.map((product, index) => (
            <div key={product.id || index} className="px-2">
              <img
                src={product.image}
                alt={`Product ${index + 1}`}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
      {/* Filter Button (Only visible on mobile) */}
      <div className="flex md:hidden justify-end mb-6">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          <FaSlidersH />
          Filter
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-6 w-full relative">
        
        {/* Filter Section (Desktop) */}
        <div className="hidden md:block w-full max-w-[250px] h-fit">
          <div className="sticky top-20 w-full p-4 border-2 border-slate-900 rounded-lg shadow-lg bg-white dark:bg-gray-900" style={{ position: "sticky" }}>
            <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Brand</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="brand" checked={brand === 'sila'} value="sila" className="form-checkbox h-4 w-4 text-blue-500" onClick={(e) => setBrand(e.target.value)}/>
                  <span>Sila</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="brand" checked={brand === 'radial'} value="radial" className="form-checkbox h-4 w-4 text-blue-500" onClick={(e) => setBrand(e.target.value)}/>
                  <span>radial</span>
                </label>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-4 mt-5">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Categories</h3>
              <div className="mt-2 space-y-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <label key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" onClick={() => updateFilter(i + 1)} checked={categories.includes(i + 1)} />
                    <span>Category {i + 1}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 mt-4 rounded transition" onClick={() => {setBrand(""); setCategories([])}}>
              Clear All
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full">
          {loading ? (
            <div className="text-center text-gray-500">Loading products...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-5">
              <p>Error loading products: {error.message || "Something went wrong"}</p>
              <button
                className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : data && data.products.length > 0 ? (
            <>
              <div
                className="grid 
                  grid-cols-2 gap-x-6 gap-y-8 3xl:gap-y-20
                  md:grid-cols-2 md:gap-6
                  lg:grid-cols-3  
                  3xl:grid-cols-6 
                  w-full"
              >
                {currentPosts.map((product) => (
                  <div key={product.id} className="xxs:w-[115%] sm:w-full 3xl:max-h-[360px]">
                    <ProductCard variant="static" product={product} />
                  </div>
                ))}
              </div>

              {/* **Pagination outside the grid** */}
              <div className="my-10 flex justify-center">
                <Pagination
                  totalPosts={data.products.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">No products available</div>
          )}
        </div>

      </div>


      {/* Sidebar */} 
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsFilterOpen(false)}
      >
        <div
          className={`fixed bottom-0 right-0 w-64 h-full bg-light-background dark:bg-gray-900 shadow-lg p-4 transition-transform duration-500 ${
            isFilterOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-800 dark:text-gray-200 hover:text-red-500 transition-colors duration-300"
            >
              <FaTimes size={22} />
            </button>
          </div>

          {/* Mobile Filters */}
          <div className="p-4">
            {/* Brand Filter */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Brand</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="brand" value="sila" className="form-checkbox h-4 w-4 text-blue-500" checked={brand === 'sila'} onClick={(e) => setBrand(e.target.value)} />
                  <span>Sila</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="brand" value="radial" className="form-checkbox h-4 w-4 text-blue-500" checked={brand === 'radial'} onClick={(e) => setBrand(e.target.value)} />
                  <span>Radial</span>
                </label>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Categories</h3>
              <div className="mt-2 space-y-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <label key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" checked={categories.includes(i + 1)} onClick={() => updateFilter(i + 1)} />
                    <span>Category {i + 1}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-4 rounded transition" onClick={() => setIsFilterOpen(false)}>
              Apply Filters
            </button>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 mt-4 rounded transition" onClick={() => {setBrand(""); setCategories([]); setIsFilterOpen(false)}}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
