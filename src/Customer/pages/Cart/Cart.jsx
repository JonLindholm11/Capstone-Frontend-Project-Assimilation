import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "./CartContext";
import { postApiDataForCustomers, getApiDataForUsersMe } from "./api";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, changeQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  const handleCheckout = async () => {
  if (cartItems.length === 0) {
    return;
  }

  setIsProcessing(true);

  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate("/login");
      return;
    }

    const userData = await getApiDataForUsersMe();
    console.log("🔍 User data:", userData);
    
    if (!userData.customer || !userData.customer.id) {
      alert("Please set up your customer profile before placing an order");
      navigate("/profile");
      return;
    }

    const customer_id = userData.customer.id;

    const cart = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price
    }));

    const orderData = {
      customer_id,
      cart
    };

    const result = await postApiDataForCustomers(orderData);

    clearCart();
    navigate("/");
  } catch (error) {
    console.error("❌ Checkout error:", error);
    alert(`Failed to create order: ${error.message}`);
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-img" />
              <p>
                {item.name} - ${item.price}
              </p>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    changeQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total-container">
            <span>Total: ${total.toFixed(2)}</span>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
