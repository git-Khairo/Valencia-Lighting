import HomeSlider from '../Components/HomeSlider';
import AboutPreview from '../Components/HomeAbout';
import HomeProject from '../Components/HomeProject';
import HomeProduct from '../Components/HomeProduct';
import HomeCategory from '../Components/HomeCategory';
import useFetch from '../useFetch';
import Loading from '../Components/Loading';


export default function HomePage() {
  const { data, error, loading } = useFetch('/api/home');
  
  const images = [
    { src: "/storage/HomeSlider/image1.jpg", title: 'To love beauty is to see light' },
    { src: "/storage/HomeSlider/image2.webp", title: 'There are two kinds of light - the glow that illumines, and the glare that obscures' },
    { src: "/storage/HomeSlider/image3.jpg", title: 'In the right light, at the right time, everything is extraordinary.' },
    { src: "/storage/HomeSlider/image4.jpg", title: 'Design is not just what it looks like and feels like . Design is how it works.' },
    { src: "/storage/HomeSlider/image5.jpg", title: 'There are three responses to a design - YES., NO. & WOW! WE ONLY AIM FOR WOW!' },
  ];

  return (
    <>
    {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-red-500 py-20">
          <p>Error loading sections: {error.message || 'Something went wrong'}</p>
          <button
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : data ? (
      <div className="w-full overflow-x-hidden">
        <HomeSlider images={images} />
        <HomeProduct products={data.products} />
        <HomeCategory category={data.category} />
        <HomeProject projects={data.projects} />
        <AboutPreview />
      </div>
      ) : (
        <></>
      )}
    </>
  );
}
