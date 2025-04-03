import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
  faPlus,
  faBox,
  faFolder,
  faProjectDiagram,
  faEdit,
  faTrashCan,
  faAngleLeft,
  faAngleRight,
  faUpload,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './SideBar';
import debounce from 'lodash/debounce';

// Separate component for SearchResults
const SearchResults = ({ searchQuery, itemsPerPage, onEdit, onDelete, searchResults }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const allItems = [
    ...searchResults.products,
    ...searchResults.categories,
    ...searchResults.projects,
  ];

  const filteredItems = allItems.filter(item =>
    (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.categoryType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.type?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {filteredItems.length === 0 ? (
        <p className="text-center text-light-secondary dark:text-dark-secondary py-4">No results found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name || item.title || item.categoryType} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-light-text dark:text-dark-text transition-colors duration-200">
                      {item.name || item.title || item.categoryType}
                    </h3>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-light-accent text-light-primary dark:bg-dark-accent dark:text-dark-primary transition-colors duration-200">
                      {item.type === 'category' ? item.categoryType : item.type}
                    </span>
                  </div>
                  <p className="text-light-secondary dark:text-dark-secondary mb-4 text-sm sm:text-base flex-grow transition-colors duration-200">
                    {item.brand || item.categoryType || item.type}
                  </p>
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
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-light-secondary text-light-text dark:bg-dark-secondary dark:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-light-accent dark:hover:bg-dark-accent"
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-light-primary text-white dark:bg-dark-primary'
                      : 'bg-light-secondary text-light-text dark:bg-dark-secondary dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-light-secondary text-light-text dark:bg-dark-secondary dark:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-light-accent dark:hover:bg-dark-accent"
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

// New SelectionPage component
const SelectionPage = ({ selectionType, formData, setFormData, onBack, searchResults }) => {
  const [selectionSearch, setSelectionSearch] = useState('');
  const options = {
    selectedProjects: searchResults.projects.map(project => ({ value: project.id, label: project.title })),
    selectedCategories: searchResults.categories.map(category => ({ value: category.id, label: category.categoryType })),
    selectedProducts: searchResults.products.map(product => ({ value: product.id, label: product.title }))
  }[selectionType] || [];
  const selected = formData[selectionType] || [];
  const displayType = selectionType.replace('selected', '').toLowerCase();

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(selectionSearch.toLowerCase())
  );

  const toggleSelection = (value) => {
    setFormData(prev => {
      const current = prev[selectionType] || [];
      const newSelected = current.includes(value)
        ? current.filter(id => id !== value)
        : [...current, value];
      return { ...prev, [selectionType]: newSelected };
    });
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack} 
          className="mr-4 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-all duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">Select {displayType.charAt(0).toUpperCase() + displayType.slice(1)}</h3>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder={`Search ${displayType}...`}
          value={selectionSearch}
          onChange={(e) => setSelectionSearch(e.target.value)}
          className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
        />
        <div className="max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <p className="text-sm text-light-secondary dark:text-dark-secondary px-3 py-2">No {displayType} found.</p>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option.value}
                className="flex items-center px-3 py-2 text-sm text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-accent cursor-pointer transition-all duration-200"
                onClick={() => toggleSelection(option.value)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => {}}
                  className="mr-2"
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
          className="px-4 py-2 text-sm font-medium text-light-primary hover:bg-light-accent dark:text-dark-primary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
        >
          Done
        </button>
      </div>
    </>
  );
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addPage, setAddPage] = useState(1);
  const [addType, setAddType] = useState(null);
  const [addSelectionType, setAddSelectionType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchResults, setSearchResults] = useState({ products: [], categories: [], projects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const deleteModalRef = useRef(null);
  const addModalRef = useRef(null);

  const [addProductForm, setAddProductForm] = useState({
    name: '', title: '', description: '', brand: '', image: null, dateOfRelease: '', code: '', datasheet: null,
    selectedProjects: [], selectedCategories: []
  });
  const [addCategoryForm, setAddCategoryForm] = useState({ type: '', image: null, selectedProducts: [] });
  const [addProjectForm, setAddProjectForm] = useState({
    title: '', images: [], description: '', dateOfProject: '', selectedProducts: []
  });

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchSearchResults = debounce(async () => {
      setLoading(true);
      setError('');
      try {
        const url = searchQuery.length > 0 
          ? `http://127.0.0.1:8000/api/search?query=${searchQuery}`
          : 'http://127.0.0.1:8000/api/defaultSearch';
        
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Remove if not needed
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.message === 'Search' || data.message === 'Default Search') {
          setSearchResults({
            products: data.products?.map(item => ({ ...item, type: 'product' })) || [],
            categories: data.categories?.map(item => ({ ...item, categoryType: item.type, type: 'category' })) || [],
            projects: data.projects?.map(item => ({ ...item, type: 'project' })) || [],
          });
        } else {
          setError('No results found');
          setSearchResults({ products: [], categories: [], projects: [] });
        }
      } catch (err) {
        setError(`Failed to fetch search results: ${err.message}`);
        setSearchResults({ products: [], categories: [], projects: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    fetchSearchResults();
    return () => fetchSearchResults.cancel();
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
        setShowDeleteModal(false);
      }
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setShowAddModal(false);
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = (item) => {
    setIsEditing(true);
    setAddType(item.type.charAt(0).toUpperCase() + item.type.slice(1));
    setAddPage(2);

    if (item.type === 'product') {
      setAddProductForm({
        name: item.name || '',
        title: item.title || '',
        description: item.description || '',
        brand: item.brand || '',
        image: null,
        dateOfRelease: item.dateOfRelease || '',
        code: item.code || '',
        datasheet: null,
        selectedProjects: item.projects ? item.projects.map(p => p.id) : [],
        selectedCategories: item.categories ? item.categories.map(c => c.id) : []
      });
    } else if (item.type === 'category') {
      setAddCategoryForm({
        type: item.categoryType || '',
        image: null,
        selectedProducts: item.products ? item.products.map(p => p.id) : []
      });
    } else if (item.type === 'project') {
      setAddProjectForm({
        title: item.title || '',
        images: [],
        description: item.description || '',
        dateOfProject: item.dateOfProject || '',
        selectedProducts: item.products ? item.products.map(p => p.id) : []
      });
    }
    setShowAddModal(true);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleAddNext = (type) => {
    setAddType(type);
    setAddPage(2);
    setAddProductForm({
      name: '', title: '', description: '', brand: '', image: null, dateOfRelease: '', code: '', datasheet: null,
      selectedProjects: [], selectedCategories: []
    });
    setAddCategoryForm({ type: '', image: null, selectedProducts: [] });
    setAddProjectForm({ title: '', images: [], description: '', dateOfProject: '', selectedProducts: [] });
  };

  const confirmAdd = () => {
    if (addType === 'Product') {
      console.log(isEditing ? 'Edit Product:' : 'Add Product:', addProductForm);
    } else if (addType === 'Category') {
      console.log(isEditing ? 'Edit Category:' : 'Add Category:', addCategoryForm);
    } else if (addType === 'Project') {
      console.log(isEditing ? 'Edit Project:' : 'Add Project:', addProjectForm);
    }
    setShowAddModal(false);
    setAddPage(1);
    setAddType(null);
    setAddSelectionType(null);
    setIsEditing(false);
  };

  const handleAddBack = () => {
    if (addPage === 3) {
      setAddPage(2);
      setAddSelectionType(null);
    } else {
      setAddPage(1);
      setAddType(null);
      setIsEditing(false);
    }
  };

  const handleAddSelect = (selectionType) => {
    setAddSelectionType(selectionType);
    setAddPage(3);
  };

  return (
    <div className="mt-[64px] min-h-[calc(100vh-64px)] bg-light-background dark:bg-dark-background transition-colors duration-200">
      <div className="flex">
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, categories, or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 pr-24 sm:pr-28 rounded-lg border-none bg-white shadow-sm text-sm text-light-text dark:text-dark-text dark:bg-dark-secondary focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200 hover:shadow-md"
              />
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary transition-colors duration-200" 
              />
              <button
                onClick={() => { setShowAddModal(true); setIsEditing(false); }}
                className="absolute sm:right-[1px] h-full top-1/2 -translate-y-1/2 px-2 py-1 sm:px-3 sm:py-1.5 bg-light-primary text-white rounded-r-md hover:bg-light-accent dark:bg-dark-primary dark:hover:bg-dark-accent shadow-sm text-xs sm:text-sm transition-all duration-200 hover:shadow-md"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Add
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4 text-light-text dark:text-dark-text">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <SearchResults 
              searchQuery={searchQuery} 
              itemsPerPage={itemsPerPage} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              searchResults={searchResults}
            />
          )}
        </main>

        <Sidebar />
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 transition-opacity duration-200">
          <div 
            ref={deleteModalRef} 
            className="bg-white dark:bg-dark-secondary rounded-lg p-6 w-full max-w-md shadow-lg transition-all duration-200 ease-in-out opacity-0 translate-y-[-20px]"
            style={showDeleteModal ? { opacity: 1, translateY: '0' } : {}}
          >
            <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">Confirm Delete</h3>
            <p className="text-light-secondary dark:text-dark-secondary mb-6">
              Are you sure you want to delete "{itemToDelete?.name || itemToDelete?.title || itemToDelete?.categoryType}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="px-4 py-2 text-sm font-medium text-light-secondary hover:text-light-text hover:bg-light-secondary dark:text-dark-secondary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 transition-opacity duration-200">
          <div 
            ref={addModalRef} 
            className="bg-white dark:bg-dark-secondary rounded-lg p-6 w-full max-w-lg shadow-lg transition-all duration-200 ease-in-out opacity-0 translate-y-[-20px] overflow-y-auto max-h-[80vh]"
            style={showAddModal ? { opacity: 1, translateY: '0' } : {}}
          >
            {addPage === 1 && !isEditing && (
              <>
                <h3 className="text-xl font-semibold mb-6 text-light-text dark:text-dark-text">Add New Item</h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => handleAddNext('Product')} 
                    className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-accent hover:bg-light-secondary dark:hover:bg-dark-primary rounded-lg transition-all duration-200 flex items-center justify-start"
                  >
                    <FontAwesomeIcon icon={faBox} className="mr-2" />
                    Product
                  </button>
                  <button 
                    onClick={() => handleAddNext('Category')} 
                    className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-accent hover:bg-light-secondary dark:hover:bg-dark-primary rounded-lg transition-all duration-200 flex items-center justify-start"
                  >
                    <FontAwesomeIcon icon={faFolder} className="mr-2" />
                    Category
                  </button>
                  <button 
                    onClick={() => handleAddNext('Project')} 
                    className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-accent hover:bg-light-secondary dark:hover:bg-dark-primary rounded-lg transition-all duration-200 flex items-center justify-start"
                  >
                    <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                    Project
                  </button>
                </div>
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => setShowAddModal(false)} 
                    className="px-4 py-2 text-sm font-medium text-light-secondary hover:text-light-text hover:bg-light-secondary dark:text-dark-secondary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {addPage === 2 && addType === 'Product' && (
              <>
                <div className="flex items-center mb-6">
                  <button 
                    onClick={handleAddBack} 
                    className="mr-4 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {isEditing ? 'Edit Product' : 'Add Product'}
                  </h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Name</label>
                    <input
                      type="text"
                      value={addProductForm.name}
                      onChange={(e) => setAddProductForm({ ...addProductForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Title</label>
                    <input
                      type="text"
                      value={addProductForm.title}
                      onChange={(e) => setAddProductForm({ ...addProductForm, title: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Description</label>
                    <textarea
                      value={addProductForm.description}
                      onChange={(e) => setAddProductForm({ ...addProductForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200 min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Brand</label>
                    <input
                      type="text"
                      value={addProductForm.brand}
                      onChange={(e) => setAddProductForm({ ...addProductForm, brand: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Image</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAddProductForm({ ...addProductForm, image: e.target.files[0] })}
                        className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-light-primary file:text-white hover:file:bg-light-accent dark:file:bg-dark-primary dark:hover:file:bg-dark-accent"
                      />
                      <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Date of Release</label>
                    <input
                      type="date"
                      value={addProductForm.dateOfRelease}
                      onChange={(e) => setAddProductForm({ ...addProductForm, dateOfRelease: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Code</label>
                    <input
                      type="text"
                      value={addProductForm.code}
                      onChange={(e) => setAddProductForm({ ...addProductForm, code: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Datasheet (PDF)</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setAddProductForm({ ...addProductForm, datasheet: e.target.files[0] })}
                        className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-light-primary file:text-white hover:file:bg-light-accent dark:file:bg-dark-primary dark:hover:file:bg-dark-accent"
                      />
                      <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Projects</label>
                    <button
                      onClick={() => handleAddSelect('selectedProjects')}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-accent hover:bg-light-secondary dark:hover:bg-dark-primary rounded-lg transition-all duration-200 text-left"
                    >
                      {addProductForm.selectedProjects.length > 0 
                        ? `${addProductForm.selectedProjects.length} selected` 
                        : 'Select projects'}
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Categories</label>
                    <button
                      onClick={() => handleAddSelect('selectedCategories')}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-accent hover:bg-light-secondary dark:hover:bg-dark-primary rounded-lg transition-all duration-200 text-left"
                    >
                      {addProductForm.selectedCategories.length > 0 
                        ? `${addProductForm.selectedCategories.length} selected` 
                        : 'Select categories'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <button 
                    onClick={() => setShowAddModal(false)} 
                    className="px-4 py-2 text-sm font-medium text-light-secondary hover:text-light-text hover:bg-light-secondary dark:text-dark-secondary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmAdd} 
                    className="px-4 py-2 text-sm font-medium text-white bg-light-primary hover:bg-light-accent dark:bg-dark-primary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    {isEditing ? 'Save' : 'Add'}
                  </button>
                </div>
              </>
            )}

            {addPage === 2 && addType === 'Category' && (
              <>
                <div className="flex items-center mb-6">
                  <button 
                    onClick={handleAddBack} 
                    className="mr-4 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {isEditing ? 'Edit Category' : 'Add Category'}
                  </h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Type</label>
                    <input
                      type="text"
                      value={addCategoryForm.type}
                      onChange={(e) => setAddCategoryForm({ ...addCategoryForm, type: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Image</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAddCategoryForm({ ...addCategoryForm, image: e.target.files[0] })}
                        className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-light-primary file:text-white hover:file:bg-light-accent dark:file:bg-dark-primary dark:hover:file:bg-dark-accent"
                      />
                      <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Products</label>
                    <button
                      onClick={() => handleAddSelect('selectedProducts')}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-accent hover:bg-light-secondary dark:hover:bg-dark-primary rounded-lg transition-all duration-200 text-left"
                    >
                      {addCategoryForm.selectedProducts.length > 0 
                        ? `${addCategoryForm.selectedProducts.length} selected` 
                        : 'Select products'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <button 
                    onClick={() => setShowAddModal(false)} 
                    className="px-4 py-2 text-sm font-medium text-light-secondary hover:text-light-text hover:bg-light-secondary dark:text-dark-secondary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmAdd} 
                    className="px-4 py-2 text-sm font-medium text-white bg-light-primary hover:bg-light-accent dark:bg-dark-primary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    {isEditing ? 'Save' : 'Add'}
                  </button>
                </div>
              </>
            )}

            {addPage === 2 && addType === 'Project' && (
              <>
                <div className="flex items-center mb-6">
                  <button 
                    onClick={handleAddBack} 
                    className="mr-4 text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {isEditing ? 'Edit Project' : 'Add Project'}
                  </h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Title</label>
                    <input
                      type="text"
                      value={addProjectForm.title}
                      onChange={(e) => setAddProjectForm({ ...addProjectForm, title: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Images (Multiple)</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setAddProjectForm({ ...addProjectForm, images: Array.from(e.target.files) })}
                        className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-light-primary file:text-white hover:file:bg-light-accent dark:file:bg-dark-primary dark:hover:file:bg-dark-accent"
                      />
                      <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
                    </div>
                    {addProjectForm.images.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {addProjectForm.images.map((file, index) => (
                          <li key={index} className="text-sm text-light-text dark:text-dark-text truncate">{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Description</label>
                    <textarea
                      value={addProjectForm.description}
                      onChange={(e) => setAddProjectForm({ ...addProjectForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200 min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Date of Project</label>
                    <input
                      type="date"
                      value={addProjectForm.dateOfProject}
                      onChange={(e) => setAddProjectForm({ ...addProjectForm, dateOfProject: e.target.value })}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Products</label>
                    <button
                      onClick={() => handleAddSelect('selectedProducts')}
                      className="w-full px-4 py-2 border border-light-secondary dark:border-dark-secondary  text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-accent hover:bg-light-secondary dark:hover:bg-dark-primary rounded-lg transition-all duration-200 text-left"
                    >
                      {addProjectForm.selectedProducts.length > 0 
                        ? `${addProjectForm.selectedProducts.length} selected` 
                        : 'Select products'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <button 
                    onClick={() => setShowAddModal(false)} 
                    className="px-4 py-2 text-sm font-medium text-light-secondary hover:text-light-text hover:bg-light-secondary dark:text-dark-secondary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmAdd} 
                    className="px-4 py-2 text-sm font-medium text-white bg-light-primary hover:bg-light-accent dark:bg-dark-primary dark:hover:bg-dark-accent rounded-lg transition-all duration-200 hover:shadow-sm"
                  >
                    {isEditing ? 'Save' : 'Add'}
                  </button>
                </div>
              </>
            )}

            {addPage === 3 && addSelectionType && (
              <SelectionPage
                selectionType={addSelectionType}
                formData={addType === 'Product' ? addProductForm : addType === 'Category' ? addCategoryForm : addProjectForm}
                setFormData={addType === 'Product' ? setAddProductForm : addType === 'Category' ? setAddCategoryForm : setAddProjectForm}
                onBack={handleAddBack}
                searchResults={searchResults}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;