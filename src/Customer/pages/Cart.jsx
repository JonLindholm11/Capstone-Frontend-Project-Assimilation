import { useState } from "react";
import "./Cart.css";

export default function Cart() {
  // Step 1: Create cart items state
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Smartphone", price: 699, quantity: 1 },
    { id: 2, name: "Laptop", price: 1299, quantity: 2 },
  ]);

  // Step 2: Function to change quantity
  const changeQuantity = (id, newQuantity) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(newCart);
  };

  // Step 3: Function to remove item
  const removeItem = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
  };

  // Step 4: Calculate total
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
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
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-total-container">
            <span>Total: ${total}</span>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}