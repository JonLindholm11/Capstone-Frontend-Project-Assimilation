import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceCategory from "../Sales/PriceCategory";
import "./SalesPage.css"; 

function SalesPage() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [priceCategory, setPriceCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product || !paymentMethod || !priceCategory) {
      alert("Please complete all fields before submitting your order.");
      return;
    }

    alert(
      `Order placed: ${quantity} x ${product} (${priceCategory}) via ${paymentMethod}.`
    );

    // Navigate to a confirmation page (example route)
    navigate("/order-confirmation");
  };

  return (
    <div className="sales-container">
      <h2 className="sales-title">🛍️ Place Your Order</h2>

      <form onSubmit={handleSubmit} className="sales-form">
        <div className="form-group">
          <label htmlFor="product">Product</label>
          <select
            id="product"
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
              setPriceCategory(""); 
            }}
          >
            <option value="">-- Select a product --</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphones">Headphones</option>
          </select>
        </div>

        {product && (
          <div className="form-group">
            <label htmlFor="priceCategory">Price Category</label>
            <PriceCategory
              product={product}
              value={priceCategory}
              onChange={(val) => setPriceCategory(val)}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">-- Select payment method --</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          🛒 Submit Order
        </button>
      </form>
    </div>
  );
}

export default SalesPage;


