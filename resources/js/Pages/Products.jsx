import { useCallback, useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Filter from "../Components/Filter";

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
  const [showFilters, setShowFilters] = useState(true);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSortDropdown && !event.target.closest('.sort-dropdown')) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortDropdown]);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  const updateFilter = (categoryID) => {
    setCategories((prev) =>
      prev.includes(categoryID) ? prev.filter((c) => c !== categoryID) : [...prev, categoryID]
    );
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
   useEffect(() => {
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
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };
 
  return (
    <div className="w-full m-0 md:w-full">
      {/* Slider Section */}
      <section className="pt-16 pb-10">
      <div className="w-full">
        <Slider {...ProductSliderSettings}>
          {products.map((product, index) => (
            <div key={product.id || index} className="relative">
              <img
                src={product.image}
                alt={`Product ${index + 1}`}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">Winter Sale</h1>
                <p className="text-lg text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button className="text-black text-base bg-white/40 px-4 py-1.5 rounded-md">Shop Now</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>

      {/* Main Content Layout */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="flex gap-8">
        { showFilters &&
        <Filter updateFilter={updateFilter} brand={brand} categories={categories} setBrand={setBrand} setCategories={setCategories}/>
        }
        {/* Products Section */}
        <div className={`${showFilters ? "w-4/5" : "w-full"} w-full`}>
        <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">All Products</h2>
              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                <button
                  className="!rounded-button flex items-center space-x-2 px-4 py-2 border hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  onClick={toggleFilters}
                >
                  <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                  <i className={`fas fa-${showFilters ? 'eye-slash' : 'eye'}`}></i>
                </button>
                </div>
                {/* Filter Button (Only visible on mobile) */}
                <div className="block md:hidden">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="!rounded-button flex items-center space-x-2 px-4 py-2 border ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'hover:bg-gray-100'} cursor-pointer whitespace-nowrap"
                  >
                    <FaSlidersH className="mr-1.5"/>
                    Filter
                  </button>
                </div>
                <div className="relative sort-dropdown">
                  <button
                    className="!rounded-button flex items-center space-x-2 px-4 py-2 border hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span>Sort By: {sortOption}</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg z-10">
                      {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'].map(option => (
                        <div
                          key={option}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSortOption(option.toLowerCase());
                            setShowSortDropdown(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
                  <input type="radio" name="brandMobile" value="sila" className="form-radio h-4 w-4 text-blue-500" checked={brand === 'sila'} onChange={(e) => setBrand(e.target.value)} />
                  <span>Sila</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <input type="radio" name="brandMobile" value="radial" className="form-radio h-4 w-4 text-blue-500" checked={brand === 'radial'} onChange={(e) => setBrand(e.target.value)} />
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
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" checked={categories.includes(i + 1)} onChange={() => updateFilter(i + 1)} />
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
    </div>
  );
};

export default Products;
