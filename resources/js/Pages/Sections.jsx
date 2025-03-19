import Section from '../Components/Section';
import useFetch from '../useFetch';

const Sections = () => {
  const { data, error, loading } = useFetch('/api/sections');
  console.log(data);

  return (
    <div className="w-full m-0 md:w-full md:h-full pt-24">
      {loading ? (
        <div className="text-center text-gray-500">Loading sections...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-5">
          <p>Error loading sections: {error.message || 'Something went wrong'}</p>
          <button
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : data.Sections ? (
        data.Sections.map((section) => (
          <Section
            key={section.category.id}
            category={section.category}
            products={section.products}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">No sections available</div>
      )}
    </div>
  );
};

export default Sections;