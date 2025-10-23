import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import PriceCategory from "../Sales/PriceCategory";
import "./SalesPage.css";
import { useNavigate } from "react-router";

export default function SalesPage() {
  const { token, role } = useAuth(); 
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [priceCategory, setPriceCategory] = useState("");
  const [clientOrders, setClientOrders] = useState([]); 
  const navigate = useNavigate();
   // Jodson -  Don't need this admin role check below. Rerouted sales page via token role_id
  // useEffect(() => {
  //   if (role === "admin") {
  //     setClientOrders([
  //       {
  //         name: "John Doe",
  //         product: "Laptop",
  //         quantity: 2,
  //         payment: "Credit Card",
  //       },
  //       {
  //         name: "Jane Smith",
  //         product: "Smartphone",
  //         quantity: 1,
  //         payment: "Bank Transfer",
  //       },
  //     ]);
  //   }
  // }, [role]);

  // if (!token || role !== "admin") {
  //   return (
  //     <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
  //       ⚠️ Access Denied — Admins Only
  //       <br />
  //       <button onClick={() => navigate("/")}>Back to Home</button>
  //     </div>
  //   );
  // }
   // Jodson - Added token based salesmen access control and incorporated it with and role selection via token
useEffect(() => {
  if (!token) {
    navigate('/login');
    return;
  }

  // Decode token to check role_id
  const payload = JSON.parse(atob(token.split('.')[1]));
  
  // Only salesmen (role_id = 2) can access
  if (payload.role_id !== 2) {
    alert('Access Denied! Only salesmen can access this page.');
    navigate('/');
    return;
  }

  // Load sample orders for salesmen
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
}, [token, navigate]);
  


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

    setClientOrders((prev) => [order, ...prev]);
    navigate("/order-confirmation", order);
  };

  return (
    <div className="sales-container">
      <h2>🛍️  Salesman Dashboard</h2>

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
