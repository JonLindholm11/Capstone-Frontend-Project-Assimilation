import { useState } from "react";
import DisplayOrdersDetails from "./DisplayOrdersDetails.jsx";

export default function DisplayOrders({ orders }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [toggle, setToggle] = useState(false);

  const toggleOrderDetails = (orderId) => {
    if (toggle) return;

    setToggle(true);

    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
    } else {
      setSelectedOrderId(orderId);
    }

    setTimeout(() => {
      setToggle(false);
    }, 500);
  };

  return (
    <div className="orders">
      <h2>Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>
              <strong>Order #{order.id}</strong>
              <p>Date: {new Date(order.created_date).toLocaleDateString()}</p>
              <p>Total: ${order.total_amount}</p>
              <p>Status: {order.order_status}</p>
              <button 
                onClick={() => toggleOrderDetails(order.id)}
                disabled={toggle}
              >
                {selectedOrderId === order.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            {selectedOrderId === order.id && (
              <DisplayOrdersDetails orderId={order.id} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
