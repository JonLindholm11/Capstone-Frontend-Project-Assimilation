import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <h2>⚠️ No Order Found</h2>
          <p>It looks like you didn’t place an order yet.</p>
          <button onClick={() => navigate("/")} className="back-btn">
            Go Back to Store
          </button>
        </div>
      </div>
    );
  }

  const { product, quantity, paymentMethod, priceCategory, date } = state;

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2>✅ Order Confirmed!</h2>
        <p>Thank you for your purchase. Here are your order details:</p>

        <div className="order-details">
          <p><strong>Product:</strong> {product}</p>
          <p><strong>Category:</strong> {priceCategory}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <p><strong>Payment:</strong> {paymentMethod}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>

        {/* <p className="note">
          You’ll receive an email with your order details and delivery updates soon.
        </p> */} 

        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Store
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;

