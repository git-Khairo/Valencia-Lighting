import { useState } from 'react';
import Section from '../Components/Section';
import useFetch from '../useFetch';
import Pagination from '../Components/Pagination';
import Loading from '../Components/Loading';
import { Helmet } from "react-helmet";

const Sections = () => {
  const { data, error, loading } = useFetch('/api/sections');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Adjust as needed

  // Extract sections data
  const allSections = data?.Sections || [];

  console.log(data);

  // Pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentSections = allSections.slice(firstPostIndex, lastPostIndex);

  return (
    <>
    <Helmet>
            <title>Vallencia Lighting | Sections</title>
            <meta name="description" content="Discover modern lighting solutions at Vallencia. Shop LED lights, chandeliers, and more for your home or business. Illuminate your space today!" />
            <link rel="canonical" href="https://www.vallencialighting.com/About%20Us" />

            <meta property="og:title" content="Vallencia Lighting" />
            <meta property="og:description" content="Best lighting products and custom lighting services." />
            <meta property="og:image" content="/storage/logo/vallencia logo.png" />
            <meta property="og:url" content="https://www.vallencialighting.com/" />

            {/* Schema JSON-LD */}
            <script type="application/ld+json">
            {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Vallencia Lighting",
                "url": "https://www.vallencialighting.com",
                "logo": "/storage/logo/vallencia logo.png"
            })}
            </script>
            </Helmet>
    <div className="w-full m-0 md:w-full md:h-full pt-24 bg-light-background dark:bg-dark-background">
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
      ) : currentSections.length > 0 ? (
        <>
          {currentSections.map((section) => (
            <Section
              key={section.category.id}
              category={section.category}
              products={section.products}
            />
          ))}
          {/* Pagination Component */}
          <div className="py-10 flex justify-center">
            <Pagination
              totalPosts={allSections.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-light-secondary dark:text-dark-secondary">No sections available</div>
      )}
    </div>
    </>
  );
};

export default Sections;
