import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

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
      <Loading />
    );
  }

  if (loading) {
    return (
      <div className="text-center text-red-500 py-20">
      <p>Error loading sections: {error.message || 'Something went wrong'}</p>
      <button
        className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
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
        className={`fixed top-0 right-0 h-full w-72 bg-white border-l border-gray-200 
         shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:sticky  md:h-[calc(100vh)]`}
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-100 to-white 
         flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              Recent Orders
            </h2>

          </div>
          <button
            className="md:hidden text-gray-900 hover:text-blue-600"
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
              className="flex items-start space-x-4 group hover:bg-gray-50 rounded-lg p-3 
                transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center 
                group-hover:scale-105 transition-transform duration-200">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-blue-600 text-base"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Order #{order.id}
                  </p>
                  <span className="text-xs text-blue-600 font-medium">
                    {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {formatTimeAgo(order.created_at)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
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