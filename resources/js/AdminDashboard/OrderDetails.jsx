import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    type: '',
    message: '',
    title: '',
  });


  useEffect(() => {
    const token = sessionStorage.getItem('token');

    fetch(`/api/order/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error loading order'))
      .then(data => {
        setOrder(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);


  const handleConfirmEndOrder = () => {
    const token = sessionStorage.getItem('token');

    fetch(`/api/order/${order.id}/end`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to end order'))
      .then(data => {
        if (data.success) {
          setOrder(prev => ({ ...prev, state: 1 }));
          setModal({
            isOpen: true,
            type: 'success',
            title: 'Order Ended',
            message: 'The order has been successfully marked as completed.'
          });
        } else {
          setModal({
            isOpen: true,
            type: 'error',
            title: 'Failed',
            message: data.message || 'Something went wrong while ending the order.'
          });
        }
      })
      .catch(err => {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Error',
          message: err.message || 'Unexpected error occurred.'
        });
      });
  };

  const handleEndOrder = () => {
    const token = sessionStorage.getItem('token');

    fetch(`/api/order/${order.id}/end`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to end order'))
      .then(data => {
        if (data.success) {
          alert('Order ended successfully!');
          setOrder(prev => ({ ...prev, state: 1 }));
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };


  if (loading) return <div className="p-6 text-gray-700">Loading order...</div>;

  if (!order) return <div className="p-6 text-red-500">Order not found.</div>;
  console.log(order);
  return (
    <div className="min-h-300 bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Order #{order.id}</h1>
        <div className="flex flex-col-reverse md:flex-row gap-6">

          {/* Product List */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Products</h2>
            </div>
            <ul className="p-6 space-y-4 max-h-[300px] overflow-y-auto">
              {order.products.map((product, index) => (
                product ? (
                  <li key={product.id ?? index} className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4">
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded border" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.title}</p>
                        <p className="text-sm text-gray-400">Brand: {product.brand}</p>
                      </div>
                    </div>
                    <div className="text-md text-black-700">Quantity: {product.quantity}</div>
                  </li>
                ) : null
              ))}
            </ul>
          </div>


          {/* Customer Info */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
            </div>
            <div className="p-6 space-y-4 text-sm text-gray-800">
              <div><strong>Name:</strong> {order.firstName} {order.lastName}</div>
              <div><strong>Email:</strong> {order.email}</div>
              <div><strong>Phone:</strong> {order.phone}</div>
              <div><strong>Address:</strong> {order.address}</div>
              <div><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</div>
            </div>
          </div>
        </div>
        {order.state !== 1 && (
          <button
            onClick={() =>
              setModal({
                isOpen: true,
                type: 'confirm',
                title: 'End Order',
                message: 'Are you sure you want to end this order?'
              })
            }
            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded w-full lg:w-auto"
          >
            End Order
          </button>
        )}

        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          onClose={() => setModal({ ...modal, isOpen: false })}
        >
          <p className="text-gray-800 dark:text-gray-200 mb-4">{modal.message}</p>

          {modal.type === 'confirm' && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModal({ ...modal, isOpen: false })}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setModal({ ...modal, isOpen: false });
                  handleConfirmEndOrder();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Yes, End Order
              </button>
            </div>
          )}

          {(modal.type === 'success' || modal.type === 'error') && (
            <div className="flex justify-end">
              <button
                onClick={() => setModal({ ...modal, isOpen: false })}
                className="px-4 py-2 bg-light-primary hover:bg-light-accent text-white rounded"
              >
                OK
              </button>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default OrderDetails;
