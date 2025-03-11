import useFetch from '../useFetch';
import ProductCard from '../Components/ProductCard';

const Products = () => {
    const { data, error, loading } = useFetch('/api/products');

    return ( 
        <>
        {loading ? (
            <div className="text-center text-gray-500">Loading Products...</div>
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
        ) : data && data.products ? (
        <div className='w-11/12 m-auto pt-20'>
            {/* put here the filter for the products page */}
        <div className='grid grid-cols-3 gap-4'>
            {data.products.map((product) => (
                <ProductCard variant="static" product={product} />
            ))}
        </div>
        </div>
        ) : (
           <div className="text-center text-gray-500">No Products available</div>
        )}
        </>
     );
}
 
export default Products;