import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import PriceCategory from "../Sales/PriceCategory";
import "./SalesPage.css";
<<<<<<< HEAD
// import { FaChartLine, FaMoneyBillWave } from "react-icons/fa";

=======
import { useNavigate } from "react-router";
>>>>>>> JacobsBranch

export default function SalesPage() {
  const { token, role } = useAuth(); // Auth context
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [priceCategory, setPriceCategory] = useState("");
  const [clientOrders, setClientOrders] = useState([]); // mock client orders
  const navigate = useNavigate();

  // Mock fetch client orders
  useEffect(() => {
    if (role === "admin") {
      setClientOrders([
        {
          name: "John Doe",
          product: "Laptop",
          quantity: 2,
          payment: "Credit Card",
        },
        {
          name: "Jane Smith",
          product: "Smartphone",
          quantity: 1,
          payment: "Bank Transfer",
        },
      ]);
    }
  }, [role]);

  // Block non-admin users
  if (!token || role !== "admin") {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        ⚠️ Access Denied — Admins Only
        <br />
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product || !paymentMethod || !priceCategory) {
      alert("Please fill all fields");
      return;
    }

    const order = {
      client: "Test Client",
      product,
      quantity,
      paymentMethod,
      priceCategory,
      date: new Date().toLocaleString(),
    };

    // For demo, just add to local state
    setClientOrders((prev) => [order, ...prev]);

    // Optionally navigate to OrderConfirmation page
    navigate("/order-confirmation", order);
  };

  return (
    <div className="sales-container">
      <h2>🛍️ Admin Sales Dashboard</h2>

      <form onSubmit={handleSubmit} className="sales-form">
        <div className="form-group">
          <label>Product:</label>
          <select
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
            <label>Price Category:</label>
            <PriceCategory
              product={product}
              value={priceCategory}
              onChange={setPriceCategory}
            />
          </div>
        )}

        <div className="form-group">
          <label>Quantity:</label>
          <select
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
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">-- Select payment --</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit">🛒 Place Order</button>
      </form>

      <h3 style={{ marginTop: "2rem" }}>📋 Client Orders</h3>
      {clientOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        clientOrders.map((order, index) => (
          <div key={index} className="client-order">
            <p>
              <strong>Client:</strong> {order.client || order.name}
            </p>
            <p>
              <strong>Product:</strong> {order.product}
            </p>
            <p>
              <strong>Category:</strong> {order.priceCategory}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentMethod || order.payment}
            </p>
            <p>
              <strong>Date:</strong> {order.date || "N/A"}
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
