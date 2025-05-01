import { useState, useEffect } from "react";
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Components/ProductCard";
import { useParams } from "react-router-dom";
import useFetch from '../useFetch';
import Loading from '../Components/Loading';

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch(`/api/projects/${id}`);

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
      { breakpoint: 425, settings: { slidesToShow: 1 } }
    ],
  };

  const ImageSliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 986);

  // Update state on window resize
  useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 986);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
   <>
   {loading ? (
      <Loading />
    ) : error ? (
      <div className="text-center text-red-500 py-20">
        <p>Error loading Project: {error.message || 'Something went wrong'}</p>
        <button
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    ) : data && data.project ? (
   <div className='scroll-smooth pt-20 bg-light-background dark:bg-dark-background'>
   <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y:0 }} 
        transition={{ duration: 1 }} 
        viewport={{ once: true }} 
    >
    <div className='mx-2 my-5 sm:mx-10'>
      <h1 className="text-3xl text-light-text dark:text-dark-text font-Montserrat md:text-5xl">{data.project.title}</h1>
      <div className="flex justify-between items-center py-5">
        <div className="text-light-text dark:text-dark-text font-SulphurPoint text-base sm:text-xl">{data.project.quote}</div>
        <div className="text-light-text dark:text-dark-text font-SulphurPoint text-base sm:text-xl">{data.project.location}</div>
      </div>
    </div>
    <Slider {...ImageSliderSettings} className="w-screen max-h-fits">
      {data.project.images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            className="w-screen h-[500px] object-cover"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </Slider>
    </motion.section>

    <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mx-auto my-10 sm:my-20 sm:p-6 grid grid-cols-1 md:grid-cols-2 space-x-10"
        >
            <div className="flex flex-col justify-center mx-10">
                <h2 className="text-xl sm:text-3xl font-Montserrat text-light-primary dark:text-dark-primary mb-4">Project Description</h2>
                <p className="text-light-text dark:text-dark-text font-Jura text-base md:text-lg">
                {data.project.description}
                </p>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isMobile ? (isExpanded
                      ? "grid-rows-[1fr] opacity-100 scale-100"
                      : "grid-rows-[0fr] opacity-0 scale-95") : "grid-rows-[1fr] opacity-100 scale-100"
                  }`}
                >
                <div className="overflow-hidden">
                    <p className="text-light-text dark:text-dark-text font-Jura text-base md:text-lg">
                    This project is an architectural masterpiece that integrates modern design principles with 
                sustainability. The use of high-quality materials ensures durability and aesthetic appeal.
                Located in the heart of New York, this project serves as a benchmark for future developments.
                This project is an architectural masterpiece that integrates modern design principles with 
                sustainability.
                    </p>
                  </div>
                </div>
  
                {/* Toggle Button */}
                {isMobile && <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-blue-600 text-left font-medium transition-colors duration-200 hover:text-blue-800"
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Hide" : "Read More"}
                </button>}
            </div>

            <div className="mt-5">
                <h2 className="text-2xl font-Montserrat mb-4 text-light-primary dark:text-dark-primary text">Project Details</h2>
                <table className="w-11/12 sm:w-full">
                    <tbody>
                        <tr className="border-b">
                            <td className="px-2 py-5 font-Montserrat text-light-text dark:text-dark-text">Date:</td>
                            <td className="px-2 py-5 font-SulphurPoint text-light-text dark:text-dark-text">{data.project.dateOfProject}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-2 py-5 font-Montserrat text-light-text dark:text-dark-text">Location:</td>
                            <td className="px-2 py-5 font-SulphurPoint text-light-text dark:text-dark-text">{data.project.location}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-2 py-5 font-Montserrat text-light-text dark:text-dark-text">Products Used:</td>
                            <td className="px-2 py-5 font-SulphurPoint text-light-text dark:text-dark-text">{data.project.products.map((product) => product.name + ", ")}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-2 py-5 font-Montserrat text-light-text dark:text-dark-text">Partners:</td>
                            <td className="px-2 py-5 font-SulphurPoint text-light-text dark:text-dark-text">{data.project.partners}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.section>
<motion.section 
initial={{ opacity: 0, y: 50 }} 
whileInView={{ opacity: 1, y:0 }}
transition={{ duration: 1 }} 
viewport={{ once: true }}
className="flex flex-col md:flex-row items-center justify-between mx-auto bg-light-background dark:bg-dark-background">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left px-10 pt-5 sm:pt-0">
        <h2 className="text-2xl lg:text-4xl text-light-primary dark:text-dark-primary font-Montserrat border-b pb-3 border-light-primary dark:border-dark-primary">{data.project.paragraph[0].title}</h2>
        <p className="mt-2 text-light-text dark:text-dark-text sm:text-lg font-Jura">
        {data.project.paragraph[0].paragraph}
        </p>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0">
        <img
          src={data.project.images[0]}
          alt="Descriptive Alt Text"
          className="w-full h-auto"
        />
      </div>
    </motion.section>
    <motion.section 
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }} 
    viewport={{ once: true }} 
    className='flex flex-col justify-center items-center w-full px-10 pt-14 text-center md:pb-5'>
    
    <p className='font-SulphurPoint text-light-text dark:text-dark-text text-base sm:text-lg md:text-xl mb-6'>
        This is a description of the section. It provides some brief
        information about the content displayed in this section.
        This is a description of the section. It provides some brief
        information about the content displayed in this section.
        This is a description of the section. It provides some brief
        information about the content displayed in this section.
    </p>
</motion.section>
    <motion.section 
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 1 }} 
    viewport={{ once: true }}
    className="flex flex-col md:flex-row items-center justify-between mx-auto">

      {/* Right Image */}
      <div className="w-full p-4 sm:p-14 md:w-1/2 md:p-2 mt-6 md:mt-0">
        <img
          src={data.project.images[1]}
          alt="Descriptive Alt Text"
          className="w-full h-auto rounded-xl"
        />
      </div>
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left px-10">
        <h2 className="text-2xl sm:text-3xl md:text:3xl text-center text-light-primary dark:text-dark-primary font-Montserrat border-b pb-3 border-light-primary dark:border-dark-primary">{data.project.paragraph[1].title}</h2>
        <p className="mt-4 mb-10 text-light-text dark:text-dark-text font-Jura text-sm sm:text-base md:text-xl">
        {data.project.paragraph[1].paragraph}
        </p>
      </div>
    </motion.section>
    <motion.section 
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 1 }} 
    viewport={{ once: true }}
    className="mx-auto px-10 py-20 flex flex-col md:flex-row items-center gap-6">
      {/* Left Static Description */}
      <div className="md:w-1/3 text-center md:text-left">
        <h2 className="text-3xl text-light-primary dark:text-dark-primary font-Montserrat md:text-4xl">Project Products</h2>
        <p className="mt-4 text-light-text dark:text-dark-text font-Jura text-xs sm:text-lg md:xl">
          These are the products used in the project. Scroll through to see them all.
        </p>
      </div>

      {/* Right Side Slider */}
      {data.project.products && data.project.products.length > 1 ? (
      <div className="md:w-2/3 w-full">
        <Slider {...ProductSliderSettings}>
          {data.project.products.map((product) => (
            <ProductCard key={product.id} variant="no-hover" product={product} />
          ))}
        </Slider>
      </div>
        ) : (
          <ProductCard variant="no-hover" product={data.project.products[0]} />
        )}
    </motion.section>
</div>
) : (
  <div className="text-center text-gray-500">Project Not Found</div>
)}
   </>
     );
}
 
export default ProjectDetails;