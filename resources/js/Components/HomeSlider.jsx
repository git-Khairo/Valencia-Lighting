import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = ({ images }) => {
  const imageSliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <motion.div 
    initial={{ opacity: 0, scale: 1.2 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="w-full bg-light-background dark:bg-dark-background">
      <Slider {...imageSliderSettings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="absolute inset-0 bg-black/25"></div>
            <img
              src={image.src}
              className="w-full h-[400px] md:h-[600px] object-cover"
              alt={image.title}
            />
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <h2 className="text-white font-SulphurPoint text-3xl">{image.title}</h2>
            </div>
          </div>
        ))}
        </Slider>
    </motion.div>
  );
};

export default HomeSlider;