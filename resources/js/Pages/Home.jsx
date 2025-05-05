import HomeSlider from '../Components/HomeSlider';
import AboutPreview from '../Components/HomeAbout';
import HomeProject from '../Components/HomeProject';
import HomeProduct from '../Components/HomeProduct';
import HomeCategory from '../Components/HomeCategory';
import useFetch from '../useFetch';
import Loading from '../Components/Loading';
import { Helmet } from "react-helmet";


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
        <>
        <Helmet>
        <title>Vallencia Lighting</title>
        <meta name="description" content="{{ config('app.description', env('APP_DESCRIPTION', 'Discover modern lighting solutions at Vallencia. Shop LED lights, chandeliers, and more for your home or business. Illuminate your space today!')) }}" />
        <link rel="canonical" href="https://www.vallencialighting.com/" />
        <meta property="og:title" content="Vallencia Lighting" />
        <meta property="og:description" content="Best lighting products and custom lighting services." />
        <meta property="og:image" content="https://wwwvallencialighting.com/storage/logo/vallencia%20logo.png" />
        <meta property="og:url" content="https://www.vallencialighting.com/" />

        {/* Schema JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Vallencia Lighting",
            "url": "https://www.vallencialighting.com",
            "logo": "https://wwwvallencialighting.com/storage/logo/vallencia%20logo.png"
          })}
        </script>
        </Helmet>
      <div className="w-full overflow-x-hidden dark:bg-dark-background2">
        <HomeSlider images={images} />
        <HomeProduct products={data.products} />
        <HomeCategory category={data.category} />
        <HomeProject projects={data.projects} />
        <AboutPreview />
      </div>
      </>
      ) : (
        <></>
      )}
    </>
  );
}
