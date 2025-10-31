import { useCart } from "./CartContext";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, changeQuantity } = useCart();

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
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
