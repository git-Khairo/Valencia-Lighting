import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

// Card component for displaying individual items (products, categories, projects)
const Card = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      {/* Image Section */}
      <div className="h-40 sm:h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name || item.title || item.categoryType}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content Section */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-light-text dark:text-dark-text transition-colors duration-200">
            {item.name || item.title || item.categoryType}
          </h3>
          <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-light-accent text-light-primary dark:bg-dark-accent dark:text-dark-primary transition-colors duration-200">
            { item.type}
          </span>
        </div>
        <p className="text-light-secondary dark:text-dark-secondary mb-4 text-sm sm:text-base flex-grow transition-colors duration-200">
          {item.brand || item.categoryType || item.type}
        </p>
        {/* Action Buttons */}
        <div className="flex justify-between space-x-2 mt-auto pt-4">
          <button
            onClick={() => onEdit(item)}
            className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-light-primary hover:bg-light-accent dark:text-dark-primary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <FontAwesomeIcon icon={faEdit} className="mr-1 sm:mr-2" />
            Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <FontAwesomeIcon icon={faTrashCan} className="mr-1 sm:mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;