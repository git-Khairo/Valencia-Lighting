import Section from '../Components/Section';
import useFetch from '../useFetch';

const Sections = () => {
  const { data, error, loading } = useFetch('/api/sections');

  return (
    <div className=" w-full m-0 md:w-full md:h-full pt-24">
      {!loading ? (
        data.Sections.map((section) => (
          <Section key={section.category.id} category={section.category} products={section.products} />
        ))
      ) : (
        <div>Loading sections...</div>
      )}
    </div>
  );
};

export default Sections;
