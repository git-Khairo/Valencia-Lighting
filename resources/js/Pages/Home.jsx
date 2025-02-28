import HomeSlider from '../Components/HomeSlider';
import AboutPreview from '../Components/HomeAbout';

const images = [
  { src: '/build/assets/banner1.jpg', title: 'Explore Our New Collection' },
  { src: '/build/assets/banner2.jpg', title: 'Latest Arrivals for You' },
  { src: '/build/assets/banner3.jpg', title: 'Trending Now!' },
];

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeSlider images={images} />
      <AboutPreview />
    </div>
  );
}
