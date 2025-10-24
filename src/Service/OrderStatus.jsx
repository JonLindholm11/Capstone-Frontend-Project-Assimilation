import { useState } from 'react';
import './OrderStatus.css';
// import Error404 from '../Error404';




export default function OrderStatus() {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check order status
  const checkOrder = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/orders/${orderNumber}`);
      const data = await response.json();
      setOrder(data);
    } catch {
      alert('Order not found');
    }
    
    setLoading(false);
  };

  return (
    <div className="order-status-container">
      <h1>Track Your Order</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Enter order number"
        />
        <button onClick={checkOrder} disabled={loading}>
          {loading ? 'Loading...' : 'Track'}
        </button>
      </div>


      {order && (
        <div className="order-card">
          <div className={`status-badge ${order.status}`}>
            {order.status}
          </div>

          <div className="order-info">
            <p><strong>Order:</strong> {order.id}</p>
            <p><strong>Product:</strong> {order.productName}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
          </div>
        </div>
      )}
    </div>
  );
}


