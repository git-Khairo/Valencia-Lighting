import { useState } from 'react';
import Section from '../Components/Section';
import useFetch from '../useFetch';
import Pagination from '../Components/Pagination';
import Loading from '../Components/Loading';

const Sections = () => {
  const { data, error, loading } = useFetch('/api/sections');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Adjust as needed

  // Extract sections data
  const allSections = data?.Sections || [];

  // Pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentSections = allSections.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="w-full m-0 md:w-full md:h-full pt-24">
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
          <div className="my-10 flex justify-center">
            <Pagination
              totalPosts={allSections.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">No sections available</div>
      )}
    </div>
  );
};

export default Sections;
