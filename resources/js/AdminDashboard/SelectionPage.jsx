import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../useFetch';

const SelectionPage = ({ selectionType, formData, setFormData, onBack, addType }) => {
  const [selectionSearch, setSelectionSearch] = useState('');

  // Guard against undefined addType
  const type = addType ? addType.toLowerCase() : '';
  const url = type ? `/api/selection-items?type=${type}` : null;
  const { data, loading, error } = useFetch(url);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!type || !data || loading) {
      setOptions([]);
      return;
    }

    let newOptions = [];
    if (addType === 'Product') {
      if (selectionType === 'selectedProjects') {
        newOptions =
          data.projects?.map(project => ({
            value: `project_${project.id}`,
            label: project.title,
            rawId: Number(project.id),
            type: 'project',
          })) || [];
      } else if (selectionType === 'selectedCategories') {
        newOptions =
          data.categories?.map(category => ({
            value: `category_${category.id}`,
            label: category.type,
            rawId: Number(category.id),
            type: 'category',
          })) || [];
      }
    } else if (addType === 'Category' || addType === 'Project') {
      newOptions =
        data.products?.map(product => ({
          value: `product_${product.id}`,
          label: product.name,
          rawId: product.code,
          type: 'product',
        })) || [];
    }

    setOptions(newOptions);
  }, [data, loading, addType, selectionType, type]);

  const selected = formData[selectionType] || [];
  const displayType = selectionType.replace('selected', '').toLowerCase();

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(selectionSearch.toLowerCase())
  );

  const toggleSelection = (option) => {
    setFormData(prev => {
      const current = prev[selectionType] || [];
      const rawId = option.rawId;
      let newSelected;

      if (selectionType === 'selectedProjects' && option.type === 'project') {
        newSelected = current.includes(rawId)
          ? current.filter(id => id !== rawId)
          : [...current, rawId];
      } else if (selectionType === 'selectedCategories' && option.type === 'category') {
        newSelected = current.includes(rawId)
          ? current.filter(id => id !== rawId)
          : [...current, rawId];
      } else if (selectionType === 'selectedProducts' && option.type === 'product') {
        newSelected = current.includes(rawId)
          ? current.filter(id => id !== rawId)
          : [...current, rawId];
      } else {
        newSelected = current;
      }
      console.log(newSelected);

      return { ...prev, [selectionType]: newSelected };
    });
  };


  return (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 text-light-text hover:text-light-primary transition-all duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h3 className="text-xl font-semibold text-light-text">
          Select {displayType.charAt(0).toUpperCase() + displayType.slice(1)}
        </h3>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder={`Search ${displayType}...`}
          value={selectionSearch}
          onChange={e => setSelectionSearch(e.target.value)}
          className="w-full px-4 py-2 border border-light-secondary rounded-lg text-sm text-light-text bg-light-background focus:ring-2 focus:ring-light-primary transition-all duration-200"
        />
        <div className="max-h-60 overflow-y-auto">
          {loading ? (
            <p className="text-sm text-light-secondary px-3 py-2">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500 px-3 py-2">{error}</p>
          ) : !type ? (
            <p className="text-sm text-light-secondary px-3 py-2">
              Invalid selection type. Please go back and try again.
            </p>
          ) : filteredOptions.length === 0 ? (
            <p className="text-sm text-light-secondary px-3 py-2">
              No {displayType} found.
            </p>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option.value}
                className="flex items-center px-3 py-2 text-sm text-light-text hover:bg-light-secondary transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.rawId)}
                  onChange={() => toggleSelection(option)}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                {option.label}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-light-primary hover:bg-light-accent rounded-lg transition-all duration-200 hover:shadow-sm"
        >
          Done
        </button>
      </div>
    </>
  );
};

export default SelectionPage;