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
      const response = await fetch(`${API}/products`);

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
      const response = await fetch(`${API}/special_pricing`);

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

    if (!currentUser || !currentUser.id) {
      setError("User information not available. Please log out and log back in.");
      return;
    }

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
          start_date: start_date,
          end_date: end_date,
          created_by_user_id: currentUser.id
        })
      });
      // change here to handle both JSON and text responses
      const contentType = response.headers.get("content-type");
      let result;
      
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { message: text, error: text };
      }

      if (response.ok) {
        setMessage(result.message || "Special pricing created successfully!");
        e.target.reset();
        fetchSpecialPricing();
      } else {
        //this line changed to handle both text and json error messages
        setError(result.error || result.message || "Failed to create special pricing");
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
            {products
              .sort((a, b) => a.product_name.localeCompare(b.product_name))
              .map(product => (
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
            min="0.01"
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
        <h3>Active / Inactive Specials</h3>
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
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {specialPricing.map(pricing => (
                <tr key={pricing.id}>
                  <td>{pricing.product_name}</td>
                  <td>${parseFloat(pricing.special_price).toFixed(2)}</td>
                  <td>{new Date(pricing.start_date).toLocaleDateString()}</td>
                  <td>{new Date(pricing.end_date).toLocaleDateString()}</td>
                  <td>User #{pricing.created_by_user_id}</td>
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