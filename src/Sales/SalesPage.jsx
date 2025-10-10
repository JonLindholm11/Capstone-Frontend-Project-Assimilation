import React, { useState } from 'react';

function SalesForm() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product || !paymentMethod) {
      alert('Please select a product and payment method.');
      return;
    }

    alert(`Order Summary:
    - Product: ${product}
    - Quantity: ${quantity}
    - Payment Method: ${paymentMethod}
    `);

    // You could send this data to a backend here.
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>🛍️ Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="product">Product:</label><br />
          <select id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">-- Select a product --</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphones">Headphones</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="quantity">Quantity:</label><br />
          <select id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="paymentMethod">Payment Method:</label><br />
          <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">-- Select payment method --</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit">🛒 Submit Order</button>
      </form>
    </div>
  );
}

export default SalesForm;
