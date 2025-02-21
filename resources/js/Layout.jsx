import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaTimes, FaMoon, FaSun, FaBars } from "react-icons/fa";

const Layout = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    products: [],
    categories: [],
    projects: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);


  //Handle Language Toggle
  useEffect(() => {
    if (language === "ar") {
      localStorage.setItem("language", "ar");
    } else {
      localStorage.setItem("language", "en");
    }
  }, [language]);  

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setLoading(true);
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
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch search results");
          setLoading(false);
        });
    } else {
      fetch("/api/defaultSearch")
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Default Search") {
            setSearchResults({
              products: data.products || [],
              categories: data.categories || [],
              projects: data.projects || [],
            });
          }
        })
        .catch(() => setSearchResults({ products: [], categories: [], projects: [] }));
    }
  }, [searchQuery]);

  const limitedProducts = searchResults.products.slice(0, isSmallScreen ? 6 : 6);
  const limitedCategories = searchResults.categories.slice(0, isSmallScreen ? 6 : 6);
  const limitedProjects = searchResults.projects.slice(0, isSmallScreen ? 2 : 3);

  return (
    <div className="overflow-x-hidden w-full  ">
      <div className="fixed w-full z-10">
      {/* Navbar */}
      <nav className="bg-light-background dark:bg-dark-background shadow-md relative transition-colors duration-700 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left Section - Logo & Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="md:hidden text-light-secondary dark:text-dark-secondary mr-4"
                onClick={() => setShowSidebar(true)}
              >
                <FaBars size={22} />
              </button>
              <div className="text-2xl font-bold text-light-text dark:text-dark-text">
                <a href="/">Logo</a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 ml-10 items-center">
              {["Products", "Projects", "Categories", "About Us"].map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-accent font-medium transition-colors duration-700"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right Section - Search & Dark Mode */}
            <div className="flex items-center space-x-4">


              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-accent transition-colors duration-700"
              >
                {showSearch ? <FaTimes size={20} /> : <FaSearch size={20} />}
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-accent transition-colors duration-700"
              >
                {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
              </button>

              <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-2 text-light-secondary dark:text-dark-secondary
                        hover:text-light-primary dark:hover:text-dark-accent 
                        transition-all duration-300 ease-in-out font-semibold hover:font-bold">
              
              {language === "en" ? 'AR' : 'EN'}

            </button>
            
            </div>
          </div>
        </div>
      </nav>

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
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Menu</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-accent transition-colors duration-700"
            >
              <FaTimes size={22} />
            </button>
          </div>

          <ul className="mt-4 space-y-4 px-4">
            {["Products", "Projects", "Categories", "About Us"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item}`}
                  className="block py-2 px-4 text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md transition-colors"
                  onClick={() => setShowSidebar(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Mega Search Menu */}
      <div
        className={`absolute pb-10 left-0 w-full bg-light-background dark:bg-dark-background shadow-lg transition-all duration-500 ease-in-out ${showSearch ? "opacity-100 overflow-y-auto max-h-[500px] visible" : "opacity-0 overflow-hidden max-h-0 invisible"}`}
      >
        <div className="  px-4 py-4">
          {/* Search Input */}
          <div className="flex items-center border-b pb-3 border-light-secondary dark:border-dark-secondary">
            <FaSearch className="text-light-secondary dark:text-dark-secondary mr-2" />
            <input
              type="text"
              className="w-full p-2 outline-none bg-transparent text-light-text dark:text-dark-text"
              placeholder="Search product or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="ml-3 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md transition-all duration-700 hover:bg-light-accent dark:hover:bg-dark-accent">
              Search
            </button>
          </div>

          {/* Suggested Search Section */}
          <div className="hidden md:grid mt-4">
            <h4 className="text-light-text dark:text-dark-text font-medium mb-2">Suggested</h4>
            <div className="flex flex-wrap gap-2">
              {["Smart Bulbs", "Indoor Lighting", "Outdoor Lights", "Energy Efficient", "Decorative Lamps"].map((suggestion, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-light-secondary dark:bg-dark-secondary text-white rounded-full cursor-pointer hover:bg-light-accent dark:hover:bg-dark-accent transition-colors"
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop View - Full Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mt-4">
            {/* Products */}
            {limitedProducts.length > 0 && (
              <div>
                <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Products</h3>
                <div className="grid grid-cols-3 gap-3">
                  {limitedProducts.map((product, index) => (
                    <div
                      key={index}
                      className="2xl:h-32 lg:h-24 md:h-16 !sm:h-24 relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('${product.imageUrl}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {limitedCategories.length > 0 && (
              <div>
                <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Categories</h3>
                <div className="grid grid-cols-3 gap-3">
                  {limitedCategories.map((category, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="2xl:h-36 lg:h-24 md:h-20 !sm:h-28 bg-cover bg-center rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url('${category.imageUrl}')` }}
                      ></div>
                      <h4 className="text-light-text dark:text-dark-text font-semibold mt-2">{category.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {limitedProjects.length > 0 && (
              <div>
                <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Projects</h3>
                <div className="grid grid-cols-1 gap-3">
                  {limitedProjects.map((project, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('${project.imageUrl}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100px",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile View - Small Layout */}
          <div className="md:hidden mt-4 space-y-6">
            {/* Products */}
            {limitedProducts.length > 0 && (
              <div>
                <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Products</h3>
                <div className="grid grid-cols-3 gap-3">
                  {limitedProducts.map((product, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('${product.imageUrl}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "80px",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {limitedCategories.length > 0 && (
              <div>
                <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Categories</h3>
                <div className="grid grid-cols-3 gap-3">
                  {limitedCategories.map((category, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="h-24 bg-cover bg-center rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url('${category.imageUrl}')` }}
                      ></div>
                      <h4 className="text-light-text dark:text-dark-text font-semibold mt-2">{category.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {limitedProjects.length > 0 && (
              <div>
                <h3 className="text-light-text dark:text-dark-text font-medium">Projects</h3>
                <div className="grid grid-cols-1 gap-3">
                  {limitedProjects.map((project, index) => (
                    <div key={index} className="relative rounded-lg shadow-md hover:scale-101 transition-transform duration-300">
                      <div
                        className="h-32 bg-cover bg-center rounded-lg shadow-md"
                        style={{ backgroundImage: `url('${project.imageUrl}')` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Main Content */}
      <main className="  px-4 py-20">{children}</main>
    </div>
  );
};

export default Layout;
