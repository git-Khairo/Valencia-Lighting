import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faPlus,
  faBox,
  faFolder,
  faProjectDiagram,
  faUpload,
  faArrowLeft,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import Modal from './Modal';
import SearchResults from './SearchResults';
import SelectionPage from './SelectionPage';
import FormValidation from './FormValidation';
import useFetch from '../useFetch';
import Loading from '../Components/Loading';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addPage, setAddPage] = useState(1);
  const [addType, setAddType] = useState(null);
  const [addSelectionType, setAddSelectionType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({ products: [], categories: [], projects: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [formErrors, setFormErrors] = useState({}); // State for validation errors
  const deleteModalRef = useRef(null);
  const addModalRef = useRef(null);
  const navigate = useNavigate();

  const [addProductForm, setAddProductForm] = useState({
    name: '',
    title: '',
    description: '',
    brand: '',
    image: null,
    dateOfRelease: '',
    code: '',
    datasheet: null,
    selectedProjects: [],
    selectedCategories: [],
  });
  const [addCategoryForm, setAddCategoryForm] = useState({ type: '', image: null, selectedProducts: [] });
  const [addProjectForm, setAddProjectForm] = useState({
    title: '',
    images: [],
    description: '',
    dateOfProject: '',
    selectedProducts: [],
  });

  const itemsPerPage = 6;

  const url = searchQuery.length > 0
    ? `http://127.0.0.1:8000/api/search?query=${searchQuery}`
    : 'http://127.0.0.1:8000/api/defaultSearch';
  const { data, loading, error } = useFetch(url);

  // Initialize FormValidation
  const { validateForm } = FormValidation({
    formData: addType === 'Product' ? addProductForm : addType === 'Category' ? addCategoryForm : addProjectForm,
    addType,
    isEditing,
    setErrors: setFormErrors,
  });

  useEffect(() => {
    if (data && (data.message === 'Search' || data.message === 'Default Search')) {
      setSearchResults({
        products: data.products?.map(item => ({ ...item, type: 'product' })) || [],
        categories: data.categories?.map(item => ({ ...item, categoryType: item.type, type: 'category' })) || [],
        projects: data.projects?.map(item => ({ ...item, type: 'project' })) || [],
      });
      setCurrentPage(1);
    } else if (data) {
      setSearchResults({ products: [], categories: [], projects: [] });
      setCurrentPage(1);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
        setShowDeleteModal(false);
      }
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setShowAddModal(false);
        setIsEditing(false);
        setFormErrors({}); // Clear errors on modal close
      }
      if (isSidebarOpen && !event.target.closest('aside')) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 768) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isSidebarOpen]);

  const handleEdit = async (item) => {
    setIsEditing(true);
    setAddType(item.type.charAt(0).toUpperCase() + item.type.slice(1));
    setAddPage(2);

    try {
      const token = sessionStorage.getItem('token');
      const url = `http://127.0.0.1:8000/api/edit-item/${item.id}?type=${item.type}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      const data = responseData.data;
      
      if (item.type === 'product') {
        setAddProductForm({
          name: data.name || '',
          title: data.title || '',
          description: data.description || '',
          brand: data.brand || '',
          image: null,
          dateOfRelease: data.dateOfRelease || '',
          code: data.code || '',
          datasheet: null,
          selectedProjects: data.projects ? data.projects.map(p => Number(p.id)) : [],
          selectedCategories: data.categories ? data.categories.map(c => Number(c.id)) : [],
        });
      } else if (item.type === 'category') {
        setAddCategoryForm({
          id: data.id,
          type: data.type || '',
          image: null,
          selectedProducts: data.products ? data.products.map(p => p.id) : [],
        });
      } else if (item.type === 'project') {
        setAddProjectForm({
          id: data.id || '',
          title: data.title || '',
          images: [],
          description: data.description || '',
          dateOfProject: data.dateOfProject || '',
          selectedProducts: data.products ? data.products.map(p => p.id) : [],
        });
      }
    } catch (error) {
      console.error('Error fetching item for edit:', error);
    }
    setShowAddModal(true);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      let url = '';
      switch (itemToDelete.type) {
        case 'product':
          url = `http://127.0.0.1:8000/api/products/${itemToDelete.id}`;
          break;
        case 'category':
          url = `http://127.0.0.1:8000/api/categories/${itemToDelete.id}`;
          break;
        case 'project':
          url = `http://127.0.0.1:8000/api/projects/${itemToDelete.id}`;
          break;
        default:
          throw new Error('Invalid item type');
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let updatedResults;
      switch (itemToDelete.type) {
        case 'product':
          updatedResults = {
            ...searchResults,
            products: searchResults.products.filter(item => item.id !== itemToDelete.id),
          };
          break;
        case 'category':
          updatedResults = {
            ...searchResults,
            categories: searchResults.categories.filter(item => item.id !== itemToDelete.id),
          };
          break;
        case 'project':
          updatedResults = {
            ...searchResults,
            projects: searchResults.projects.filter(item => item.id !== itemToDelete.id),
          };
          break;
        default:
          updatedResults = { ...searchResults };
      }

      const allItems = [
        ...updatedResults.products,
        ...updatedResults.categories,
        ...updatedResults.projects,
      ];
      const totalPages = Math.ceil(allItems.length / itemsPerPage);

      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      } else if (allItems.length === 0) {
        setCurrentPage(1);
      }

      setSearchResults(updatedResults);
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Error deleting item: ${error.message}`);
      setShowDeleteModal(false);
    }
  };

  const handleAddNext = (type) => {
    setAddType(type);
    setAddPage(2);
    setAddProductForm({
      name: '',
      title: '',
      description: '',
      brand: '',
      image: null,
      dateOfRelease: '',
      code: '',
      datasheet: null,
      selectedProjects: [],
      selectedCategories: [],
    });
    setAddCategoryForm({ id: null, type: '', image: null, selectedProducts: [] });
    setAddProjectForm({ title: '', images: [], description: '', dateOfProject: '', selectedProducts: [] });
    setFormErrors({}); // Clear errors
  };

  const confirmAdd = async () => {
    // Validate form before submission
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const formData = new FormData();
      let url = '';
      let method = isEditing ? 'POST' : 'POST';

      if (addType === 'Product') {
        url = isEditing ? `http://127.0.0.1:8000/api/products/${addProductForm.code}` : 'http://127.0.0.1:8000/api/products/store';
        formData.append('name', addProductForm.name);
        formData.append('title', addProductForm.title || '');
        formData.append('description', addProductForm.description || '');
        formData.append('brand', addProductForm.brand || '');
        if (addProductForm.image) formData.append('image', addProductForm.image);
        formData.append('dateOfRelease', addProductForm.dateOfRelease || '');
        formData.append('code', addProductForm.code);
        if (addProductForm.datasheet) formData.append('datasheet', addProductForm.datasheet);
        addProductForm.selectedCategories.forEach((id, index) => {
          formData.append(`category_ids[${index}]`, id);
        });
        addProductForm.selectedProjects.forEach((id, index) => {
          formData.append(`project_ids[${index}]`, id);
        });
      } else if (addType === 'Category') {
        url = isEditing ? `http://127.0.0.1:8000/api/categories/${addCategoryForm.id}` : 'http://127.0.0.1:8000/api/categories';
        formData.append('type', addCategoryForm.type);
        if (addCategoryForm.image) formData.append('image', addCategoryForm.image);
        addCategoryForm.selectedProducts.forEach((id, index) => {
          formData.append(`product_ids[${index}]`, id);
        });
      } else if (addType === 'Project') {
        url = isEditing ? `http://127.0.0.1:8000/api/projects/${addProjectForm.id}` : 'http://127.0.0.1:8000/api/projects';
        formData.append('title', addProjectForm.title);
        if (addProjectForm.images.length > 0) {
          addProjectForm.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        }
        formData.append('description', addProjectForm.description || '');
        formData.append('dateOfProject', addProjectForm.dateOfProject || '');
        addProjectForm.selectedProducts.forEach((id, index) => {
          formData.append(`product_ids[${index}]`, id);
        });
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save data');
      }
      
      setShowAddModal(false);
      setAddPage(1);
      setAddType(null);
      setAddSelectionType(null);
      setIsEditing(false);
      setFormErrors({}); // Clear errors on success
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} ${addType}:`, error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleAddBack = () => {
    if (addPage === 3) {
      setAddPage(2);
      setAddSelectionType(null);
    } else {
      setAddPage(1);
      setAddType(null);
      setIsEditing(false);
      setFormErrors({}); // Clear errors
    }
  };

  const handleAddSelect = (selectionType) => {
    setAddSelectionType(selectionType);
    setAddPage(3);
  };

  return (
    <div className="min-h-[calc(100vh)] bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex relative">
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="w-full mb-6 md:mb-8 top-0 z-20 bg-gray-100 dark:bg-gray-900">
            <div className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Search products, categories, or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-32 rounded-lg border-none bg-white shadow-sm text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 hover:shadow-md"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex space-x-3">
                <button
                  onClick={() => { setShowAddModal(true); setIsEditing(false); }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm text-sm transition-all duration-200 flex items-center"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  Add
                </button>
                <button
                  className="md:hidden p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4 text-gray-900 dark:text-gray-100"><Loading /></div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <SearchResults
              searchQuery={searchQuery}
              itemsPerPage={itemsPerPage}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchResults={searchResults}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </main>

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        refProp={deleteModalRef}
        maxWidth="max-w-md"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{itemToDelete?.name || itemToDelete?.title || itemToDelete?.categoryType}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        refProp={addModalRef}
      >
        {addPage === 1 && !isEditing && (
          <>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Add New Item</h3>
            <div className="space-y-4">
              <button
                onClick={() => handleAddNext('Product')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center justify-start"
              >
                <FontAwesomeIcon icon={faBox} className="mr-2" />
                Product
              </button>
              <button
                onClick={() => handleAddNext('Category')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center justify-start"
              >
                <FontAwesomeIcon icon={faFolder} className="mr-2" />
                Category
              </button>
              <button
                onClick={() => handleAddNext('Project')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center justify-start"
              >
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                Project
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {addPage === 2 && addType === 'Product' && (
          <>
            <div className="flex items-center mb-6">
              {isEditing ? (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Product</h3>
              ) : (
                <>
                  <button
                    onClick={handleAddBack}
                    className="mr-4 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add Product</h3>
                </>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Name</label>
                <input
                  type="text"
                  value={addProductForm.name}
                  onChange={(e) => setAddProductForm({ ...addProductForm, name: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Title</label>
                <input
                  type="text"
                  value={addProductForm.title}
                  onChange={(e) => setAddProductForm({ ...addProductForm, title: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Description</label>
                <textarea
                  value={addProductForm.description}
                  onChange={(e) => setAddProductForm({ ...addProductForm, description: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 min-h-[100px]`}
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Brand</label>
                <input
                  type="text"
                  value={addProductForm.brand}
                  onChange={(e) => setAddProductForm({ ...addProductForm, brand: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.brand ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.brand && <p className="text-red-500 text-xs mt-1">{formErrors.brand}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAddProductForm({ ...addProductForm, image: e.target.files[0] })}
                    className={`w-full px-4 py-2 border ${formErrors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600 transition-all duration-200`}
                  />
                  <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </div>
                {formErrors.image && <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Date of Release</label>
                <input
                  type="date"
                  value={addProductForm.dateOfRelease}
                  onChange={(e) => setAddProductForm({ ...addProductForm, dateOfRelease: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.dateOfRelease ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.dateOfRelease && <p className="text-red-500 text-xs mt-1">{formErrors.dateOfRelease}</p>}
              </div>
              {!isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Code</label>
                <input
                  type="text"
                  value={addProductForm.code}
                  onChange={(e) => setAddProductForm({ ...addProductForm, code: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.code ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.code && <p className="text-red-500 text-xs mt-1">{formErrors.code}</p>}
              </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Datasheet (PDF)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setAddProductForm({ ...addProductForm, datasheet: e.target.files[0] })}
                    className={`w-full px-4 py-2 border ${formErrors.datasheet ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600 transition-all duration-200`}
                  />
                  <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </div>
                {formErrors.datasheet && <p className="text-red-500 text-xs mt-1">{formErrors.datasheet}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Projects</label>
                <button
                  onClick={() => handleAddSelect('selectedProjects')}
                  className={`w-full px-4 py-2 border ${formErrors.selectedProjects ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 text-left`}
                >
                  {addProductForm.selectedProjects.length > 0
                    ? `${addProductForm.selectedProjects.length} selected`
                    : 'Select projects'}
                </button>
                {formErrors.selectedProjects && <p className="text-red-500 text-xs mt-1">{formErrors.selectedProjects}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Categories</label>
                <button
                  onClick={() => handleAddSelect('selectedCategories')}
                  className={`w-full px-4 py-2 border ${formErrors.selectedCategories ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 text-left`}
                >
                  {addProductForm.selectedCategories.length > 0
                    ? `${addProductForm.selectedCategories.length} selected`
                    : 'Select categories'}
                </button>
                {formErrors.selectedCategories && <p className="text-red-500 text-xs mt-1">{formErrors.selectedCategories}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdd}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-all duration-200"
              >
                {isEditing ? 'Save' : 'Add'}
              </button>
            </div>
          </>
        )}

        {addPage === 2 && addType === 'Category' && (
          <>
            <div className="flex items-center mb-6">
              {isEditing ? (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Category</h3>
              ) : (
                <>
                  <button
                    onClick={handleAddBack}
                    className="mr-4 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add Category</h3>
                </>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Type</label>
                <input
                  type="text"
                  value={addCategoryForm.type}
                  onChange={(e) => setAddCategoryForm({ ...addCategoryForm, type: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.type ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.type && <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAddCategoryForm({ ...addCategoryForm, image: e.target.files[0] })}
                    className={`w-full px-4 py-2 border ${formErrors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600 transition-all duration-200`}
                  />
                  <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </div>
                {formErrors.image && <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Products</label>
                <button
                  onClick={() => handleAddSelect('selectedProducts')}
                  className={`w-full px-4 py-2 border ${formErrors.selectedProducts ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 text-left`}
                >
                  {addCategoryForm.selectedProducts.length > 0
                    ? `${addCategoryForm.selectedProducts.length} selected`
                    : 'Select products'}
                </button>
                {formErrors.selectedProducts && <p className="text-red-500 text-xs mt-1">{formErrors.selectedProducts}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdd}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-all duration-200"
              >
                {isEditing ? 'Save' : 'Add'}
              </button>
            </div>
          </>
        )}

        {addPage === 2 && addType === 'Project' && (
          <>
            <div className="flex items-center mb-6">
              {isEditing ? (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Project</h3>
              ) : (
                <>
                  <button
                    onClick={handleAddBack}
                    className="mr-4 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add Project</h3>
                </>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Title</label>
                <input
                  type="text"
                  value={addProjectForm.title}
                  onChange={(e) => setAddProjectForm({ ...addProjectForm, title: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Images (Multiple)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setAddProjectForm({ ...addProjectForm, images: Array.from(e.target.files) })}
                    className={`w-full px-4 py-2 border ${formErrors.images ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600 transition-all duration-200`}
                  />
                  <FontAwesomeIcon icon={faUpload} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </div>
                {formErrors.images && <p className="text-red-500 text-xs mt-1">{formErrors.images}</p>}
                {Object.keys(formErrors).map((key) => (
                  key.startsWith('images[') && <p key={key} className="text-red-500 text-xs mt-1">{formErrors[key]}</p>
                ))}
                {addProjectForm.images.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {addProjectForm.images.map((file, index) => (
                      <li key={index} className="text-sm text-gray-900 dark:text-gray-100 truncate">{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Description</label>
                <textarea
                  value={addProjectForm.description}
                  onChange={(e) => setAddProjectForm({ ...addProjectForm, description: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 min-h-[100px]`}
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Date of Project</label>
                <input
                  type="date"
                  value={addProjectForm.dateOfProject}
                  onChange={(e) => setAddProjectForm({ ...addProjectForm, dateOfProject: e.target.value })}
                  className={`w-full px-4 py-2 border ${formErrors.dateOfProject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200`}
                />
                {formErrors.dateOfProject && <p className="text-red-500 text-xs mt-1">{formErrors.dateOfProject}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Products</label>
                <button
                  onClick={() => handleAddSelect('selectedProducts')}
                  className={`w-full px-4 py-2 border ${formErrors.selectedProducts ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 text-left`}
                >
                  {addProjectForm.selectedProducts.length > 0
                    ? `${addProjectForm.selectedProducts.length} selected`
                    : 'Select products'}
                </button>
                {formErrors.selectedProducts && <p className="text-red-500 text-xs mt-1">{formErrors.selectedProducts}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdd}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-all duration-200"
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
            addType={addType}
          />
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;