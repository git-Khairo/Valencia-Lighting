import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const HomeSlider = ({ images }) => {
  return (
    <div className="w-full sm:w-[100%]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src="/build/assets/hhh.webp"
              className="w-full h-[500px] object-cover"
              alt={image.title}
            />
            <div className="absolute top-[20%] left-[10%] flex items-start justify-start p-4">
              <h2 className="text-white text-lg font-semibold">mskldjflksjdlfkjsDLKFjkjsdlkfjlkjsfpoj jhdsfihd</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;