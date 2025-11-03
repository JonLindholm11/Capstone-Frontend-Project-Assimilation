import { useState, useEffect } from 'react';
import { getApiDataForOrderItems } from './api';

export default function DisplayOrdersDetails({ orderId }) {
  const [orderItems, setOrderItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      const data = await getApiDataForOrderItems(orderId);
      setOrderItems(data.orderItems);
      setLoading(false);
    }
    loadItems();
  }, [orderId]);

  if (loading) return <div>Loading items...</div>;

  return (
    <div className="order-details">
      <h3>Order Details</h3>
      {orderItems && orderItems.length > 0 ? (
        <ul>
          {orderItems.map((item) => (
            <li key={item.id}>
              <strong>{item.product_name}</strong>
              <p>Category: {item.product_category}</p>
              <p>Description: {item.product_description}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Unit Price: ${item.unit_price}</p>
              <p>Total: ${item.total_price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
}