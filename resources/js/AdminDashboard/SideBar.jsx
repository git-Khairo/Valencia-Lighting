import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
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
      <aside className="w-72 bg-white dark:bg-dark-secondary border-l border-light-secondary/50 dark:border-dark-secondary/50 
                       sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto hidden md:block shadow-lg transition-all duration-300">
        <div className="p-6">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-white dark:bg-dark-secondary border-l border-light-secondary/50 dark:border-dark-secondary/50 
                     sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto hidden md:block shadow-lg transition-all duration-300">
      <div className="p-6 border-b border-light-secondary/50 dark:border-dark-secondary/50 bg-gradient-to-r 
                     from-light-background to-white dark:from-dark-background dark:to-dark-secondary">
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text tracking-tight">
          Recent Orders
        </h2>
        <p className="text-xs text-light-secondary dark:text-dark-secondary mt-1">
          Latest transactions
        </p>
      </div>
      <div className="p-6 space-y-5">
        {orders.map((order) => (
          <div 
            key={order.id}
            onClick={() => handleOrderClick(order.id)}
            className="flex items-start space-x-4 group hover:bg-light-background/50 dark:hover:bg-dark-background/20 
                      rounded-lg p-3 transition-all duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-light-accent dark:bg-dark-accent flex items-center justify-center 
                           group-hover:scale-105 transition-transform duration-200">
              <FontAwesomeIcon 
                icon={faShoppingBag} 
                className="text-light-primary dark:text-dark-primary text-base"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-light-text dark:text-dark-text">
                  Order #{order.id}
                </p>
                <span className="text-xs text-light-primary dark:text-dark-primary font-medium">
                  {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-xs text-light-secondary dark:text-dark-secondary mt-1">
                {formatTimeAgo(order.created_at)}
              </p>
              <p className="text-xs text-light-secondary dark:text-dark-secondary mt-1">
                {order.firstName} {order.lastName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;