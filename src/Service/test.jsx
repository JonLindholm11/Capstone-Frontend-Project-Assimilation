import { useState } from "react";
const orderStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'canceled', label: 'Canceled' },
    { value: 'date,', label: 'date'}
  ];

const OrderStatusDropdown = ({ initialStatus, onStatusChange }) => {
    // Use the initial status for the state
    const [currentStatus, setCurrentStatus] = useState(initialStatus);
  
    const handleChange = (event) => {
      const newStatus = event.target.value;
      setCurrentStatus(newStatus);
      onStatusChange(newStatus); // Notify the parent component of the change
    };
  
    return (
      <div className="order-status-container">
        <label htmlFor="order-status">Order Status:</label>
        <select 
          id="order-status" 
          value={currentStatus} 
          onChange={handleChange}
        >
          {orderStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default OrderStatusDropdown;