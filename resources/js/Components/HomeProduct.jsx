import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeProduct = ({ products }) => {
    const ProductSliderSettings = {
        dots: true,
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
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y:0 }}
    transition={{ duration: 1 }} 
    viewport={{ once: true }}
    className="mx-auto px-10 py-20 flex flex-col md:flex-row items-center gap-6">
      {/* Left Static Description */}
      <div className="md:w-1/3 text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-900 font-serif md:text-3xl">Project Products</h2>
        <p className="mt-4 text-gray-600 text-xs sm:text-xl md:lg">
          These are the products used in the project. Scroll through to see them all.
        </p>
      </div>

      {/* Right Side Slider */}
      <div className="md:w-2/3 w-full">
        <Slider {...ProductSliderSettings}>
          {products.map((product) => (
            <div key={product.id} className="p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-xl"
              />
              <p className="absolute top-0 sm:top-5 text-white text-center font-bold text-sm sm:text-2xl md:text-lg md:ml-5 lg:text-2xl 2xl:text-4xl">{product.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
        </>
     );
}
 
export default HomeProduct;