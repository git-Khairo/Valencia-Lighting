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
    { src: "https://picsum.photos/200", title: 'Explore Our New Collection' },
    { src: "https://picsum.photos/200", title: 'Latest Arrivals for You' },
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
