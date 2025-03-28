// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
  faPlus,
  faBox,
  faFolder,
  faProjectDiagram,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './SideBar'; // Import the new Sidebar component

const Dashboard = () => {
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNav, setSelectedNav] = useState('Dashboard');
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [apiData, setApiData] = useState({ products: [], categories: [], projects: [] });
  const [loading, setLoading] = useState(true);

  const deleteModalRef = useRef(null);
  const editModalRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', title: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/search?query=s');
        const data = await response.json();
        setApiData({
          products: data.products.map(item => ({ ...item, type: 'product' })),
          categories: data.categories.map(item => ({ ...item, type: 'category' })),
          projects: data.projects.map(item => ({ ...item, type: 'project' }))
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allItems = [
    ...apiData.products,
    ...apiData.categories,
    ...apiData.projects
  ];

  const filteredItems = allItems.filter(item =>
    (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.title?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
        setShowDeleteModal(false);
      }
      if (editModalRef.current && !editModalRef.current.contains(event.target)) {
        setShowEditModal(false);
      }
      const dropdown = document.getElementById('searchDropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        setShowAddDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = (item) => {
    setItemToEdit(item);
    setEditForm({ 
      name: item.name || '', 
      title: item.title || '' 
    });
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const confirmEdit = () => {
    setShowEditModal(false);
    setItemToEdit(null);
  };

  const handleAddClick = (type) => {
    setShowAddDropdown(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="mt-[64px] min-h-[calc(100vh-64px)] bg-light-background dark:bg-dark-background">
      <div className="flex">
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, categories, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 pr-24 sm:pr-28 rounded-lg border-none bg-white shadow-sm text-sm text-light-text dark:text-dark-text dark:bg-dark-secondary"
              />
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" 
              />
              <button
                onClick={() => setShowAddDropdown(!showAddDropdown)}
                className="absolute sm:right-[1px] h-full top-1/2 -translate-y-1/2 px-2 py-1 sm:px-3 sm:py-1.5 bg-light-primary text-white rounded-r-md hover:bg-light-accent dark:bg-dark-primary dark:hover:bg-dark-accent shadow-sm text-xs sm:text-sm"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Add
              </button>
              {showAddDropdown && (
                <div id="searchDropdown" className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 bg-white dark:bg-dark-secondary rounded-lg shadow-lg z-10 top-full">
                  <div className="py-2">
                    <button onClick={() => handleAddClick('Product')} className="w-full px-4 py-2 text-left text-sm text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-accent cursor-pointer">
                      <FontAwesomeIcon icon={faBox} className="mr-2" />
                      Product
                    </button>
                    <button onClick={() => handleAddClick('Category')} className="w-full px-4 py-2 text-left text-sm text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-accent cursor-pointer">
                      <FontAwesomeIcon icon={faFolder} className="mr-2" />
                      Category
                    </button>
                    <button onClick={() => handleAddClick('Project')} className="w-full px-4 py-2 text-left text-sm text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-accent cursor-pointer">
                      <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                      Project
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img src={item.image} alt={item.name || item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-light-text dark:text-dark-text">
                      {item.title || item.name}
                    </h3>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-light-accent text-light-primary dark:bg-dark-accent dark:text-dark-primary">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-light-secondary dark:text-dark-secondary mb-4 text-sm sm:text-base flex-grow">
                    {item.brand || item.type}
                  </p>
                  <div className="flex justify-between space-x-2 mt-auto pt-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-light-primary hover:bg-light-accent dark:text-dark-primary dark:hover:bg-dark-accent rounded-lg"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1 sm:mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 rounded-lg"
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="mr-1 sm:mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Add the Sidebar component here */}
        <Sidebar />
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div ref={deleteModalRef} className="bg-white dark:bg-dark-secondary rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">Confirm Delete</h3>
            <p className="text-light-secondary dark:text-dark-secondary mb-6">
              Are you sure you want to delete "{itemToDelete?.name || itemToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-light-secondary hover:text-light-background hover:bg-light-secondary dark:text-dark-secondary dark:hover:bg-dark-accent rounded-lg">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-light-text bg-red-600 hover:bg-red-700 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div ref={editModalRef} className="bg-white dark:bg-dark-secondary rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">Edit {itemToEdit?.type}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-light-secondary dark:border-dark-secondary rounded-lg text-sm text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-light-secondary hover:text-light-background hover:bg-light-secondary rounded-lg">
                Cancel
              </button>
              <button onClick={confirmEdit} className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-light-primary hover:bg-light-accent dark:bg-dark-primary dark:hover:bg-dark-accent rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

=======

    return ( 
        <h1 className="title text-2xl">hello</h1>
     );
}
 
>>>>>>> 47d967aa911a826bc41ab535d5c7d36a6906d1c2
export default Dashboard;