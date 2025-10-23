import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API;

function SpecialPricing({ token, currentUser }) {
  const [products, setProducts] = useState([]);
  const [specialPricing, setSpecialPricing] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchSpecialPricing();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
  };

  const fetchSpecialPricing = async () => {
    try {
      const response = await fetch(`${API}/special_pricing`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSpecialPricing(data);
      } else {
        setError("Failed to fetch special pricing");
      }
      setLoading(false);
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formData = new FormData(e.target);
    const product_id = formData.get("product_id");
    const special_price = formData.get("special_price");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");

    try {
      const response = await fetch(`${API}/special_pricing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: parseInt(product_id),
          special_price: parseFloat(special_price),
          start_date: new Date(start_date).toISOString(),
          end_date: new Date(end_date).toISOString(),
          is_active: true,
          created_by_user_id: currentUser.id
        })
      });

      if (response.ok) {
        setMessage("Special pricing created successfully!");
        e.target.reset();
        fetchSpecialPricing();
      } else {
        const errorText = await response.text();
        setError(errorText || "Failed to create special pricing");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
  };

  const handleDelete = async (pricingId) => {
    if (!window.confirm("Are you sure you want to delete this special pricing?")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API}/special_pricing/${pricingId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage("Special pricing deleted successfully!");
        fetchSpecialPricing();
      } else {
        const errorText = await response.text();
        setError(errorText || "Failed to delete special pricing");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading special pricing...</div>;
  }

  return (
    <div className="special-pricing-section">
      <h2>Special Pricing Management</h2>
      <p>Create and manage special pricing for products</p>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="product_id">Product</label>
          <select id="product_id" name="product_id" required>
            <option value="">Select a product...</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="special_price">Special Price</label>
          <input 
            type="number" 
            step="0.01"
            id="special_price" 
            name="special_price" 
            required 
            placeholder="15.99"
          />
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input 
            type="date" 
            id="start_date" 
            name="start_date" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input 
            type="date" 
            id="end_date" 
            name="end_date" 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Add Special Pricing</button>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </form>

      <div className="special-pricing-list">
        <h3>Current Active Specials</h3>
        {specialPricing.length === 0 ? (
          <p>No active special pricing found.</p>
        ) : (
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Special Price</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {specialPricing.map(pricing => (
                <tr key={pricing.id}>
                  <td>{pricing.product_id}</td>
                  <td>${parseFloat(pricing.special_price).toFixed(2)}</td>
                  <td>{new Date(pricing.start_date).toLocaleDateString()}</td>
                  <td>{new Date(pricing.end_date).toLocaleDateString()}</td>
                  <td>{pricing.is_active ? "Active" : "Inactive"}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(pricing.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SpecialPricing;