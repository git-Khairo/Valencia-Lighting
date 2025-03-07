import HomeSlider from '../Components/HomeSlider';
import AboutPreview from '../Components/HomeAbout';
import HomeProject from '../Components/HomeProject';
import HomeProduct from '../Components/HomeProduct';
import HomeCategory from '../Components/HomeCategory';

const images = [
  { src: "https://picsum.photos/200", title: 'Explore Our New Collection' },
  { src: "https://picsum.photos/200", title: 'Latest Arrivals for You' },
  { src: "https://picsum.photos/200", title: 'Trending Now!' },
];

const products = [
  { id: 1, image: "https://picsum.photos/200", name: "Product 1" },
  { id: 2, image: "https://picsum.photos/200", name: "Product 2" },
  { id: 3, image: "https://picsum.photos/200", name: "Product 3" },
  { id: 4, image: "https://picsum.photos/200", name: "Product 4" },
];

export default function HomePage() {
  return (
    <div className="w-full">
      <HomeSlider images={images} />
      <HomeProduct products={products} />
      <HomeCategory />

      <HomeProject />
      <AboutPreview />
    </div>
  );
}
