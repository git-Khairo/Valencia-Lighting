// Sidebar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-dark-secondary border-l border-light-secondary dark:border-dark-secondary sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto hidden md:block">
      <div className="p-6 border-b border-light-secondary dark:border-dark-secondary dark:bg-dark-secondary">
        <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">Recent Orders</h2>
      </div>
      <div className="p-6 space-y-4 overflow-y-auto">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-light-accent dark:bg-dark-accent flex items-center justify-center">
            <FontAwesomeIcon icon={faShoppingBag} className="text-light-primary dark:text-dark-primary text-sm" />
          </div>
          <div>
            <p className="text-sm font-medium text-light-text dark:text-dark-text">Order #3842</p>
            <p className="text-xs text-light-secondary dark:text-dark-secondary">$234.40 - 2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-light-accent dark:bg-dark-accent flex items-center justify-center">
            <FontAwesomeIcon icon={faShoppingBag} className="text-light-primary dark:text-dark-primary text-sm" />
          </div>
          <div>
            <p className="text-sm font-medium text-light-text dark:text-dark-text">Order #3841</p>
            <p className="text-xs text-light-secondary dark:text-dark-secondary">$129.99 - 15 minutes ago</p>
          </div>
        </div>
        {/* Add more orders as needed */}
      </div>
    </aside>
  );
};

export default Sidebar;