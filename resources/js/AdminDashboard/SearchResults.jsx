import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';

const SearchResults = ({ searchQuery, itemsPerPage, onEdit, onDelete, searchResults, currentPage, setCurrentPage }) => {
  // Reset currentPage to 1 whenever searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, setCurrentPage]);

  const allItems = [
    ...searchResults.products,
    ...searchResults.categories,
    ...searchResults.projects,
  ];

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {allItems.length === 0 ? (
        <div className="text-center py-4 text-light-secondary">
          No items found.{' '}
          <button
            onClick={() => document.querySelector('.add-button')?.click()} // Trigger add button if available
            className="text-blue-600 hover:text-blue-400 "
          >
            You Can Add a new item
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentItems.map((item) => (
              <Card key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-light-secondary text-light-text disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-light-accent"
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-light-primary text-white'
                      : 'bg-light-secondary text-light-text hover:bg-light-accent'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-light-secondary text-light-text disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-light-accent"
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults; 