import { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const Layout = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-light-background dark:bg-dark-background shadow-md relative transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left Section */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-light-text dark:text-dark-text">Logo</div>
              <div className="hidden md:flex space-x-8 ml-10 items-center">
                {["Products", "Projects", "Categories", "About Us"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-accent font-medium transition-colors duration-700"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section */}
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
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Dropdown Search */}
      <div
        className={`h-svh absolute left-0 w-full bg-light-background dark:bg-dark-background shadow-lg transition-all duration-700 ease-in-out overflow-hidden ${
          showSearch ? "max-h-[543px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 transition-opacity duration-700">
          {/* Search Input */}
          <div className="flex items-center border-b pb-3 border-light-secondary dark:border-dark-secondary">
            <FaSearch className="text-light-secondary dark:text-dark-secondary mr-2" />
            <input
              type="text"
              className="w-full p-2 outline-none bg-transparent text-light-text dark:text-dark-text"
              placeholder="Search product or code..."
            />
            <button className="ml-3 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md transition-all duration-700 hover:bg-light-accent dark:hover:bg-dark-accent">
              Search
            </button>
          </div>

          {/* Quick Access Sections */}
          <div className="flex flex-wrap gap-12 mt-4">
            {/* Products */}
            <div className="w-3/12">
              <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Products</h3>
              <div className="flex flex-wrap gap-3">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-md transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url('/build/assets/kk.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "60px",
                      width: "150px",
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="w-4/12">
              <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Categories</h3>
              <div className="flex flex-wrap justify-between">
                {[
                  { title: "Indoor Lighting", img: "/build/assets/kk.jpg" },
                  { title: "Outdoor Lighting", img: "/build/assets/kk.jpg" },
                  { title: "Flexlight", img: "/build/assets/kk.jpg" },
                  { title: "Decorative Lamps", img: "/build/assets/kk.jpg" },
                  { title: "Wall Lighting", img: "/build/assets/kk.jpg" },
                  { title: "Smart Bulbs", img: "/build/assets/kk.jpg" },
                ].map((item, index) => (
                  <div key={index} className="w-1/3 p-2 bg-transparent">
                    <div
                      className="rounded-lg overflow-hidden shadow-md transition-transform duration-700 hover:scale-105"
                      style={{
                        backgroundImage: `url(${item.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "120px",
                      }}
                    >
                      <div className="p-3">
                        <h4 className="text-light-text dark:text-dark-text font-semibold">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="w-4/12">
              <h3 className="text-light-text dark:text-dark-text font-medium mb-4">Projects</h3>
              <div className="flex flex-col gap-4">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-md transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url('build/assets/kk.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                    }}
                  >
                    <div className="p-3">
                      <h4 className="text-light-text dark:text-dark-text font-semibold">Project {index + 1}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children} {/* Render the content passed as children */}
      </main>
    </div>
  );
};

export default Layout;
