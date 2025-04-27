// Layout.jsx
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import ReceiptIcon from "./Components/ReceiptIcon";
import useFetch from './useFetch';

const Layout = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchResults, setSearchResults] = useState({ products: [], categories: [], projects: [] });
  const [error, setError] = useState("");
  const contentRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const { data } = useFetch('/api/suggested');
  
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle Window Resizing
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Scroll for Navbar and Dropdown Effect
  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        const sliderHeight = document.querySelector("#slider")?.offsetHeight || 0;
        setIsScrolled(window.scrollY > sliderHeight + 200);
      } else {
        setIsScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, location.pathname]);

  // Handle Search
  useEffect(() => {
    if (searchQuery.length > 0) {
      setError("");
      fetch(`/api/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Search") {
            setSearchResults({
              products: data.products || [],
              categories: data.categories || [],
              projects: data.projects || [],
            });
          } else {
            setError("No results found");
          }
        })
        .catch(() => {
          setError("Failed to fetch search results");
        });
    } else {
      fetch("/api/defaultSearch")
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Default Search") {
            setSearchResults({
              products: data.products || [],
              categories: data.products || [],
              projects: data.projects || [],
            });
          }
        })
        .catch(() => setSearchResults({ products: [], categories: [], projects: [] }));
    }
  }, [searchQuery]);

  const limitedProducts = searchResults.products.slice(0, isSmallScreen ? 4 : 6);
  const limitedCategories = searchResults.categories.slice(0, isSmallScreen ? 4 : 6);
  const limitedProjects = searchResults.projects.slice(0, isSmallScreen ? 2 : 3);

  if(error){
    <h1>An Error occured</h1>
  }

  return (
    <>
    <ScrollToTop />
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full z-10">
        <div
          className={`${showSearch ? "fixed inset-0 bg-gray/30 dark:bg-black/30 transition-opacity opacity-100 visible z-10 backdrop-blur-md" : ""}`}
          onClick={() => setShowSearch(false)}
        >
          <nav
            className={`relative transition-all duration-700 ease-in-out w-full shadow-md ${
              isHomePage && !isScrolled && !showSearch
                ? "bg-white/30 dark:bg-dark-background/50 backdrop-blur-md"
                : "bg-light-background dark:bg-dark-background"
            }`}
          >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              {/* Left Section - Logo & Mobile Menu Button */}
              <div className="flex items-center">
                <button
                  className="md:hidden text-light-secondary2 dark:text-gray-200 mr-4 hover:text-light-primary hover:dark:text-dark-primary transition-colors duration-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSidebar(true);
                  }}
                >
                  <FaBars size={22} />
                </button>
                <div className="flex justify-center items-center space-x-2 text-2xl text-light-text dark:text-dark-text">
                  <img src={darkMode ? "/storage/logo/vallencia logo.png" : "/storage/logo/vallencia logo 2.png"} alt="" className="h-10" />
                  <a href="/" className="font-Montserrat">Vallencia Lighting</a>
                </div>
              </div>

              {/* Desktop Navigation - Centered */}
              <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
                {["Products", "Categories", "Projects", "About Us"].map((item) => (
                  <a
                    key={item}
                    href={`/${item}`}
                    className="relative font-Montserrat text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary font-medium transition-colors duration-500 after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:w-0 after:h-[2.5px] after:bg-light-primary dark:after:bg-dark-primary after:rounded-full after:transition-all after:duration-500 hover:after:w-[120%] hover:after:left-[-10%]"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Right Section - Search & Dark Mode */}
              <div className="flex items-center space-x-10 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSearch(!showSearch);
                  }}
                  className="text-light-secondary2 dark:text-dark-secondary2 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-700 z-20"
                >
                  {showSearch ? <FaTimes size={20} /> : <FaSearch size={20} />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDarkMode((prev) => !prev);
                  }}
                  className="text-light-secondary2 dark:text-dark-secondary2 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-700 z-20"
                >
                  {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
                <ReceiptIcon />
              </div>
            </div>
          </div>
          </nav>

          {/* Search Dropdown (Mega Dropdown) */}
          <div
            ref={dropdownRef}
            className={`absolute top-[63.49px] left-0 w-[100%] sm:w-[100%] 2xl:w-[50%] 2xl:mx-[25%] md:w-[72%] md:mx-[14%] lg:w-[60%] lg:mx-[20%] shadow-2xl rounded-b-lg transition-all duration-700 ease-in-out overflow-hidden ${
              showSearch
                ? `opacity-100 visible xl:max-h-[500px] max-h-[340px] sm:max-h-[400px] z-10 ${
                    isHomePage && !isScrolled && !showSearch
                      ? "bg-white/30 dark:bg-dark-background/50 backdrop-blur-md"
                      : "bg-light-background dark:bg-dark-background"
                  }`
                : "opacity-0 max-h-0 invisible bg-light-background dark:bg-dark-background"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:px-4 px-2 xl:max-h-[500px] max-h-[340px] sm:max-h-[400px] 3xl:h-[600px]">
              <div className="flex items-center border-b pb-3 border-light-secondary dark:border-dark-secondary">
                <FaSearch className="text-gray-800 dark:text-gray-200 mr-3" />
                <input
                  type="text"
                  className="w-full p-2 outline-none bg-transparent font-SulphurPoint text-light-text dark:text-dark-text placeholder-light-secondary dark:placeholder-dark-secondary2"
                  placeholder="Search product or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex max-sm:h-[340px] max-h-[275px] overflow-hidden mt-4 3xl:min-h-[400px]">
                <div className="sm:block hidden sm:w-[30%] w-[30%] overflow-hidden p-2">
                  <h4 className="text-light-text dark:text-dark-text font-Montserrat mb-2">Suggestions</h4>
                  <ul className="space-y-2">
                    {data.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setSearchQuery(item)}
                        className="flex items-center justify-between text-light-text dark:text-dark-text font-SulphurPoint sm:px-3 sm:py-2 py-1 rounded-md cursor-pointer transition-all duration-300 hover:text-light-primary dark:hover:text-dark-primary hover:scale-[102%]"
                      >
                        <span className="flex items-center">
                          <FaSearch className="mr-2 text-light-text dark:text-dark-text" />
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:block hidden w-[2px] bg-gradient-to-b from-light-secondary to-transparent dark:from-dark-secondary dark:to-transparent"></div>
                <div ref={contentRef} className="w-[100%] sm:w-[70%] overflow-y-auto custom-scrollbar px-4">
                  {limitedProducts.length > 0 && (
                    <div>
                      <h3 className="text-light-text dark:text-dark-text font-Montserrat mb-3">Products</h3>
                      <div className="grid xs:grid-cols-4 grid-cols-2 sm:grid-cols-3 2.5xl:grid-cols-4 gap-4 mb-5 justify-items-center">
                        {limitedProducts.map((product, index) => (
                          <Link
                            to={`/product/${product.id}`}
                            key={index}
                            className="flex flex-col items-center"
                            onClick={() => setShowSearch(!showSearch)}
                          >
                            <div className="relative 2xl:h-36 2xl:w-32 lg:h-32 lg:w-28 md:h-28 md:w-24 sm:w-24 sm:h-28 w-32 h-40 xs:w-24 xs:h-28 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-light-background via-light-background via-40% to-light-secondary dark:from-dark-secondary dark:via-dark-secondary dark:via-10% dark:to-dark-background"></div>
                              <img
                                src="/build/assets/new.png"
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                            <p className="mt-2 text-sm text-center font-SulphurPoint text-light-text dark:text-dark-text">
                              {product.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {limitedCategories.length > 0 && (
                    <div className="mt-0 mb-5">
                      <h3 className="text-light-text dark:text-dark-text font-Montserrat mb-3">Categories</h3>
                      <div className="grid xs:grid-cols-4 grid-cols-2 sm:grid-cols-3 2.5xl:grid-cols-4 gap-4 mb-5 justify-items-center">
                        {limitedCategories.map((category, index) => (
                          <Link
                            to={`/category/${category.id}`}
                            key={index}
                            className="flex flex-col items-center"
                            onClick={() => setShowSearch(!showSearch)}
                          >
                            <div className="relative 2xl:h-36 2xl:w-32 lg:h-32 lg:w-28 md:h-28 md:w-24 sm:w-24 sm:h-28 w-20 h-24 xs:w-28 xs:h-32 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                              <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('/build/assets/new.png')` }}
                              ></div>
                            </div>
                            <p className="mt-2 text-sm text-center font-SulphurPoint text-light-text dark:text-dark-text">
                              {category.type}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {limitedProjects.length > 0 && (
                    <div className="mt-4 mb-4">
                      <h3 className="text-light-text dark:text-dark-text font-Montserrat mb-3">Projects</h3>
                      <div className="flex flex-wrap mx-[2%] gap-3">
                        {limitedProjects.map((project, index) => (
                          <Link
                            to={`/project/${project.id}`}
                            key={index}
                            className="flex flex-col items-center w-full"
                            onClick={() => setShowSearch(!showSearch)}
                          >
                            <div className="relative lg:h-64 md:h-44 sm:h-32 h-28 w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-[101%] transition-all duration-300 ease-in-out">
                              <img
                                src={project.imageUrl}
                                alt="Project"
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                            <p className="mt-2 text-sm text-center font-SulphurPoint text-light-text dark:text-dark-text">
                              {project.title}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-500 ${
          showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowSidebar(false)}
      >
        <div
          className={`fixed left-0 top-0 w-64 h-full bg-light-background dark:bg-dark-background shadow-lg transform transition-transform duration-500 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-Montserrat text-light-text dark:text-dark-text">Menu</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-700"
            >
              <FaTimes size={22} />
            </button>
          </div>
          <ul className="mt-4 space-y-4 px-4">
            {["Products", "Projects", "Categories", "About Us"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item}`}
                  className="block py-2 px-4 font-Montserrat text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md transition-colors"
                  onClick={() => setShowSidebar(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="shadow-2xl shadow-slate-700 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text py-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-SulphurPoint text-light-primary dark:text-dark-primary">
              "Lighting up your world, one innovation at a time."
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left mb-12">
            <div>
              <h3 className="text-xl font-Montserrat mb-4 text-light-primary dark:text-dark-primary">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={'/'} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={'/products'} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                  Products
                  </Link>
                </li>
                <li>
                  <Link to={'/categories'} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to={'/projects'} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-Montserrat mb-4 text-light-primary dark:text-dark-primary">Outdoor</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={`/products/1`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Residential Lighting
                  </Link>
                </li>
                <li>
                  <Link to={`/products/2`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Commercial Solutions
                  </Link>
                </li>
                <li>
                  <Link to={`/products/3`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Energy Efficient Systems
                  </Link>
                </li>
                <li>
                  <Link to={`/products/4`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Smart Lighting
                  </Link>
                </li>
                <li>
                  <Link to={`/products/5`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Smart Lighting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
            <h3 className="text-xl font-Montserrat mb-4 text-light-primary dark:text-dark-primary">Indoor</h3>
            <ul className="space-y-2">
                <li>
                  <Link to={`/products/1`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Residential Lighting
                  </Link>
                </li>
                <li>
                  <Link to={`/products/2`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Commercial Solutions
                  </Link>
                </li>
                <li>
                  <Link to={`/products/3`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Energy Efficient Systems
                  </Link>
                </li>
                <li>
                  <Link to={`/products/4`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Smart Lighting
                  </Link>
                </li>
                <li>
                  <Link to={`/products/5`} className="font-SulphurPoint hover:text-light-secondary dark:hover:text-light-secondary transition-all duration-200">
                    Smart Lighting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-Montserrat mb-4 text-light-primary dark:text-dark-primary">Contact Us</h3>
              <p className="font-SulphurPoint">Address: Sharjah, U.A.E</p>
              <p className="font-SulphurPoint">Email: info@vallencia.com</p>
              <p className="font-SulphurPoint">Phone: +971 (6) 551-0777</p>
              <p className="font-SulphurPoint">Phone: +971 (055) 663-6640</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center border-t border-gray-300 dark:border-gray-700 pt-6">
          {/* Left Section - Logo & Name */}
          <div className="flex justify-center items-center space-x-2 mb-6 md:mb-0">
            <img src={darkMode ? "/storage/logo/vallencia logo.png" : "/storage/logo/vallencia logo 2.png"} alt="" className="h-12" />
            <h2 className="text-2xl font-Montserrat text-light-primary dark:text-dark-primary">Vallencia Lighting</h2>
          </div>

          {/* Center Section - Social Media Icons */}
          <div className="flex flex-1 justify-center items-center space-x-6 mb-6 md:mr-20 md:mb-0">
            <a href="https://www.instagram.com/vallencia_lighting?igsh=MWJjbmViMXlraHpmNA==" target="_blank" className="text-3xl hover:scale-105 transition-transform hover:text-light-primary dark:hover:text-dark-primary">
              <FaInstagram />
            </a>
            <a href="https://maps.app.goo.gl/vjxwGkRjhwjRYMAq7" target="_blank" className="text-3xl text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-all duration-200">
              <FaMapMarkerAlt />
            </a>
          </div>

          {/* Right Section - Sponsor Logos */}
          <div className="flex justify-center items-center space-x-4 mt-6 md:mt-0">
            <a href="https://www.sila-eu.com/" target="_blank">
              <img src="/storage/logo/sila logo.png" alt="Sponsor 1" className="h-20 opacity-80 hover:opacity-100 transition-opacity duration-200" />
            </a>
            <a href="https://www.radial-eu.com/" target="_blank">
              <img src="/storage/logo/radial logo.png" alt="Sponsor 2" className="h-12 opacity-80 hover:opacity-100 transition-opacity duration-200" />
            </a>
          </div>
        </div>
          <div className="flex justify-center font-Montserrat text-sm mt-8 text-light-secondary dark:text-dark-secondary">
            © {new Date().getFullYear()} Valencia Lighting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Layout;