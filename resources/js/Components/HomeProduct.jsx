import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

const HomeProduct = ({ products }) => {
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

    return ( 
        <>
    <motion.section 
    initial={{ opacity: 0, scale: 1.2 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="mx-auto px-10 py-20 flex flex-col md:flex-row items-center gap-6 bg-light-background dark:bg-dark-background dark:text-dark-text">
      {/* Left Static Description */}
      <div className="md:w-1/3 text-center md:text-left">
        <h2 className="text-4xl border-b border-light-primary dark:border-dark-primary text-light-text dark:text-dark-text font-Montserrat md:text-5xl pb-4">Latest Products</h2>
        <p className="mt-4 text-light-secondary2 dark:text-dark-secondary2 text-xs sm:text-xl font-Jura">
          These are the products used in the project. Scroll through to see them all.
        </p>
      </div>

      {/* Right Side Slider */}
      <div className="md:w-2/3 w-full">
        <Slider {...ProductSliderSettings}>
          {products.map((product) => (
            <ProductCard variant="no-hover" product={product} key={product.id}/>
          ))}
        </Slider>
      </div>
    </motion.section>
        </>
     );
}
 
export default HomeProduct;