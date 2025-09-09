import { useCallback, useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { FaChevronDown, FaEye, FaEyeSlash, FaLightbulb, FaMinus, FaPlus, FaRegLightbulb, FaSlidersH, FaTimes } from "react-icons/fa";
import Pagination from "../Components/Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Filter from "../Components/Filter";
import { useParams } from "react-router-dom";
import Loading from '../Components/Loading';
import useFetch from '../useFetch';
import { Helmet } from "react-helmet";

const productsSlider = [
  { id: 1, image: "/storage/ProductSlider/image1.jpg", "title": "Everything is designed. Few things are designed well", "description": "- Brian Reed -" },
  { id: 2, image: "/storage/ProductSlider/image2.webp", "title": "Design adds value faster than it adds costs.", "description": "- Joel Spolsky -" },
  { id: 3, image: "/storage/ProductSlider/image3.jpeg", "title": "Lighting is the lifeblood of a design", "description": "- Gregory Kay -" },
  { id: 4, image: "/storage/ProductSlider/image4.jpg", "title": "NOT ANYONE CAN BE A DESIGNER", "description": "- Joelle -" },

];

const Products = () => {
  const { categoryNum } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(24); // Keep posts per page constant
  const [showFilters, setShowFilters] = useState(true);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState('Latest');
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState("");
  const [dropDownFilterIndoor, setDropDownFilterIndoor] = useState(false);
  const [dropDownFilterOutdoor, setDropDownFilterOutdoor] = useState(false);

  const { data: categoryNames,loading: categoryLoading, error: categoryError } = useFetch('/api/categories');
  let IndoorCategories = [];
  let OutdoorCategories = [];

  if(categoryError){
    return (
      <div className="text-center text-red-500 py-20">
        <p>Error loading Project: {error.message || 'Something went wrong'}</p>
        <button
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  if(!categoryLoading){
    IndoorCategories = categoryNames.Categories.filter((category) => category.location === 'Indoor');
    OutdoorCategories = categoryNames.Categories.filter((category) => category.location === 'Outdoor');
  }


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

  const handleSortAtoZ = () => {
    const sortedData = [...products].sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedData); // Update state with the sorted array
  };

  const handleSortZtoA = () => {
    const sortedData = [...products].sort((a, b) => b.name.localeCompare(a.name));
    setProducts(sortedData); // Update state with the sorted array
  };

  const handleSortLatest = () => {
    setProducts([...data]);
  };

  const sortFunctions = {
    "A → Z": handleSortAtoZ,
    "Z → A": handleSortZtoA,
    "Latest": handleSortLatest,
  };

  useEffect(() => {
    setCategories([]);
    if(categoryNum){
      updateFilter(parseInt(categoryNum));

    }
  }, [categoryNum])

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
        console.log(response.json());
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
        setData(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [brand, categories]);


  useEffect(() => {
    if(data){
    sortFunctions[sortOption]();
    }
  }, [data])


  // **Reset to page 1 when data changes to avoid empty pages**
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);


   // **Pagination logic**
   const lastPostIndex = currentPage * postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
   const currentPosts = products?.slice(firstPostIndex, lastPostIndex);


   const ProductSliderSettings = {
    dots: false,
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
    <>
    <Helmet>
            <title>Vallencia Lighting | Products</title>
            <meta name="description" content="Discover modern lighting solutions at Vallencia. Shop LED lights, chandeliers, and more for your home or business. Illuminate your space today!" />
            <link rel="canonical" href="https://www.vallencialighting.com/About%20Us" />

            <meta property="og:title" content="Vallencia Lighting" />
            <meta property="og:description" content="Best lighting products and custom lighting services." />
            <meta property="og:image" content="/storage/logo/vallencia logo.png" />
            <meta property="og:url" content="https://www.vallencialighting.com/" />

            {/* Schema JSON-LD */}
            <script type="application/ld+json">
            {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Vallencia Lighting",
                "url": "https://www.vallencialighting.com",
                "logo": "/storage/logo/vallencia logo.png"
            })}
            </script>
            </Helmet>
    {loading ? (
      <Loading />
    ) : error?.message ? (
      <div className="text-center text-red-500 py-20">
        <p>Error loading products: {error.message || "Something went wrong"}</p>
        <button
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    ) : (
    <div className="w-full m-0 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text overflow-x-hidden md:overflow-x-visible">
      {/* Slider Section */}
      <section className="pt-16 pb-10">
      <div className="w-full">
        <Slider {...ProductSliderSettings}>
          {productsSlider.map((product, index) => (
            <div key={product.id || index} className="relative">
              <div className="absolute inset-0 bg-black/30"></div>
              <img
                src={product.image}
                alt={`Product ${index + 1}`}
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
                <h1 className="text-2xl md:text-4xl font-SulphurPoint text-white">{product.title}</h1>
                <p className="text-sm md:text-lg text-white font-Jura">{product.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>

      {/* Main Content Layout */}
      <div className="max-w-[1440px] mx-auto px-3 py-12">
        <div className="flex gap-8">
        { showFilters &&
        <Filter updateFilter={updateFilter} brand={brand} categories={categories} setBrand={setBrand} setCategories={setCategories} IndoorCategories={IndoorCategories} OutdoorCategories={OutdoorCategories} />
        }
        {/* Products Section */}
        <div className={`${showFilters ? "w-4/5" : "w-full"} w-full`}>
        <div className="flex justify-between items-center mb-8">
              <h2 className="sm:text-4xl text-lg font-Montserrat hidden md:block">Products</h2>
              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                <button
                  className="!rounded-button flex items-center space-x-2 px-4 py-2 font-Jura border-2 border-light-text text-light-text dark:border-dark-text dark:text-dark-text hover:border-light-primary hover:text-light-primary hover:dark:border-dark-primary hover:dark:text-dark-primary cursor-pointer whitespace-nowrap"
                  onClick={toggleFilters}
                >
                  <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                  {showFilters ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
                {/* Filter Button (Only visible on mobile) */}
                <div className="block md:hidden">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 font-Jura border-2 border-light-text text-light-text dark:border-dark-text dark:text-dark-text hover:border-light-primary hover:text-light-primary hover:dark:border-dark-primary hover:dark:text-dark-primary cursor-pointer whitespace-nowrap"
                  >
                    <FaSlidersH className="mr-1.5"/>
                    Filter
                  </button>
                </div>
                <div className="relative sort-dropdown">
                  <button
                    className="flex items-center space-x-2 px-4 py-2 font-Jura border-2 border-light-text text-light-text dark:border-dark-text dark:text-dark-text hover:border-light-primary hover:text-light-primary hover:dark:border-dark-primary hover:dark:text-dark-primary cursor-pointer whitespace-nowrap"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span>Sort By: {sortOption}</span>
                    <FaChevronDown />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute text-center right-0 mt-2 w-40 bg-light-background dark:bg-dark-background border shadow-lg z-10">
                      {['Latest', 'A → Z', 'Z → A'].map(option => (
                        <div
                          key={option}
                          className="px-4 py-2 hover:bg-light-secondary hover:dark:bg-dark-secondary hover:text-light-text hover:dark:text-dark-text cursor-pointer font-Jura"
                          onClick={() => {
                            setSortOption(option);
                            setShowSortDropdown(false);
                            sortFunctions[option]();
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
          {products && products.length > 0 ? (
            <>
              <div
                className="grid 
                  grid-cols-2 gap-y-8 3xl:gap-y-20
                  md:grid-cols-2 md:gap-6
                  lg:grid-cols-3  
                  3xl:grid-cols-4 
                  w-full"
              >
                {currentPosts.map((product) => (
                  <div key={product.id} className="w-full 3xl:max-h-[360px]">
                    <ProductCard variant="static" product={product} />
                  </div>
                ))}
              </div>

              {/* **Pagination outside the grid** */}
              <div className="my-10 flex justify-center">
                <Pagination
                  totalPosts={products?.length ?? 0}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-light-secondary dark:text-dark-secondary">No products available</div>
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
          className={`fixed bottom-0 left-0 w-full h-full bg-light-background dark:bg-dark-background shadow-lg transition-transform duration-500 ${
            isFilterOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 px-4 pt-4 pb-2">
            <h2 className="text-xl font-EncodeSansCondensed text-light-text dark:text-dark-text">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-light-text dark:text-dark-text transition-colors duration-300"
            >
              <FaTimes size={22} />
            </button>
          </div>

          {/* Mobile Filters */}
          <div className="overflow-y-auto max-h-[calc(100vh-120px)] p-4">
            {/* Brand Filter */}
            <div className="mb-4 font-EncodeSansCondensed text-light-text dark:text-dark-text">
              <h3 className="font-semibold text-light-text dark:text-dark-text">Brand</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2 text-light-text dark:text-dark-text">
                <input type="radio" id="sila" name="brand" value="sila" className="peer hidden" onClick={(e) => brand === 'sila' ? setBrand("") : setBrand(e.target.value)} />
                  <span className="w-7 h-7 mr-2 flex items-center justify-center">
                  {brand === 'sila' ? (
                    <FaLightbulb size={20} />
                  ) : (
                    <FaRegLightbulb size={20}/>
                  )}
                </span>
                Sila
                </label>
                <label className="flex items-center space-x-2 text-light-text dark:text-dark-text">
                <input type="radio" id="sila" name="brand" value="radial" className="peer hidden" onClick={(e) => brand === 'radial' ? setBrand("") : setBrand(e.target.value)} />
                 <span className="w-7 h-7 mr-2 flex items-center justify-center">
                  {brand === 'radial' ? (
                    <FaLightbulb size={20} />
                  ) : (
                    <FaRegLightbulb size={20}/>
                  )}
                </span>
                Radial
                </label>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-4">
              <h3 className="font-EncodeSansCondensed text-light-text dark:text-dark-text text-xl">Categories</h3>
              <div className="mt-2 space-y-2">
                <div className={`flex justify-between items-center px-3 py-2 border-dashed border-b-2 ${dropDownFilterIndoor ? 'text-light-text border-dark-background dark:text-dark-text dark:border-light-background' : 'text-light-secondary border-light-secondary'}`}  onClick={() => {setDropDownFilterIndoor(!dropDownFilterIndoor); setDropDownFilterOutdoor(false)}}>
                <h2 className="text-lg font-EncodeSansCondensed">Indoor</h2>
                {dropDownFilterIndoor ? <FaMinus /> : <FaPlus />}
                </div>
                <div className={`overflow-hidden transition-all duration-700 ease-in-out space-y-2 ${
                        dropDownFilterIndoor ? 'opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                      }`}>
                  {dropDownFilterIndoor && IndoorCategories.map((IndoorCategory) => (
                    <label key={IndoorCategory.id} className="flex items-center space-x-2 text-light-text dark:text-dark-text font-EncodeSansCondensed">
                      <input type="checkbox" className="form-checkbox h-4 w-4 accent-black" onChange={() => updateFilter(IndoorCategory.id)} checked={categories.includes(IndoorCategory.id)} />
                      <span>{IndoorCategory.type}</span>
                    </label>
                  ))}
                  </div>
                <div className={`flex justify-between items-center px-3 py-2 border-dashed border-b-2 ${dropDownFilterOutdoor ? 'text-light-text border-dark-background dark:text-dark-text dark:border-light-background' : 'text-light-secondary border-light-secondary'}`} onClick={() => {setDropDownFilterOutdoor(!dropDownFilterOutdoor); setDropDownFilterIndoor(false)}}>
                <h2 className="text-lg font-EncodeSansCondensed">Outdoor</h2>
                {dropDownFilterOutdoor ? <FaMinus /> : <FaPlus/>}
                </div>
                <div className={`overflow-hidden transition-all duration-700 ease-in-out space-y-2 ${
                        dropDownFilterOutdoor ? 'opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                      }`}>
                  {dropDownFilterOutdoor && OutdoorCategories.map((OutdoorCategory) => (
                    <label key={OutdoorCategory.id} className="flex items-center space-x-2 text-light-text dark:text-dark-text font-EncodeSansCondensed">
                      <input type="checkbox" className="form-checkbox h-4 w-4 accent-black" onChange={() => updateFilter(OutdoorCategory.id)} checked={categories.includes(OutdoorCategory.id)} />
                      <span>{OutdoorCategory.type}</span>
                    </label>
                  ))}
                  </div>
              </div>
            </div>

            <button className="w-full font-Jura border-2 bg-light-primary hover:bg-light-background hover:border-light-primary text-light-background hover:text-light-primary dark:bg-dark-primary hover:dark:bg-dark-background hover:dark:border-dark-primary dark:text-dark-background hover:dark:text-dark-primary dark:border-dark-background py-2 mt-4 rounded transition" onClick={() => setIsFilterOpen(false)}>
              Apply Filters
            </button>
            <button className="w-full font-Jura border-2 bg-light-background hover:bg-light-secondary2 hover:border-light-secondary2 text-light-secondary2 hover:text-light-background dark:bg-dark-background hover:dark:bg-dark-secondary2 hover:dark:border-dark-secondary2 dark:text-dark-secondary2 hover:dark:text-dark-background dark:border-dark-secondary2 py-2 mt-4 rounded transition" onClick={() => {setBrand(""); setCategories([]); setIsFilterOpen(false)}}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Products;