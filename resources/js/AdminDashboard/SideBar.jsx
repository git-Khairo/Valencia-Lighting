import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setError('No authentication token found');
      setLoading(false);
      return;
    }

    fetch('/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
    setIsOpen(false);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const orderDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - orderDate) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    }
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (loading) {
    return (
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 border-l border-gray-200 
          dark:border-gray-700 shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-64px)]`}
      >
        <div className="p-6 text-gray-900 dark:text-gray-100">Loading...</div>
      </aside>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 border-l border-gray-200 
          dark:border-gray-700 shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:sticky  md:h-[calc(100vh)]`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-100 to-white 
          dark:from-gray-900 dark:to-gray-800 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
              Recent Orders
            </h2>

          </div>
          <button
            className="md:hidden text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {orders && orders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleOrderClick(order.id)}
              className="flex items-start space-x-4 group hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-3 
                transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center 
                group-hover:scale-105 transition-transform duration-200">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-blue-600 dark:text-blue-400 text-base"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Order #{order.id}
                  </p>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {formatTimeAgo(order.created_at)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {order.firstName} {order.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;