import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/order/${id}`);
        setOrder(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <p>Customer: {order.firstName} {order.lastName}</p>
      <p>Email: {order.email}</p>
      <p>Phone: {order.phone}</p>
      <h2 className="mt-4 text-xl font-semibold">Products</h2>
      {order.products.map(product => (
        <div key={product.id} className="mt-2">
          <p>{product.title} - {product.name}</p>
          <p>Brand: {product.brand}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;