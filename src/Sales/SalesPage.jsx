import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
import "./SalesPage.css";

function SalesmanPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [salesman, setSalesman] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});

  // Decode salesman info from token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("🔹 Token payload:", payload);

      if (payload.role_id !== 2) {
        alert("Access Denied! Only salesmen can access this page.");
        logout();
        navigate("/login");
        return;
      }

      setSalesman({
        id: payload.user_id || payload.id,
        name: payload.name || "Sales Representative",
        email: payload.email || "sales@example.com",
        region: payload.region || "Assigned Region",
      });
    } catch (err) {
      console.error("Error decoding token:", err);
      logout();
      navigate("/login");
    }
  }, [token, logout, navigate]);

  // ✅ Fetch customers assigned to salesman
  useEffect(() => {
    if (!salesman?.id) return;
    console.log(token);
    const fetchCustomers = async () => {
      try {
        console.log("Fetching customers for salesman:", salesman.id);

        const res = await fetch(
          `http://localhost:3000/customers/salesman/${salesman.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("🔹 Response status:", res.status);

        const text = await res.text();
        console.log("🔹 Raw backend response:", text);

        if (!res.ok) throw new Error(`Backend error: ${res.status} - ${text}`);

        const data = JSON.parse(text);
        const list = Array.isArray(data) ? data : data.customers || [];

        setCustomers(list);
        if (list.length === 0) setError("No customers assigned.");
      } catch (err) {
        console.error("❌ Fetch customers failed:", err);
        setError("Could not load customers.");
      } finally {
        console.log("✅ Finished fetching customers");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token, salesman]);

  // ✅ Product categories & products
  const productCategories = ["Cars", "Electronics", "Food", "Sewing", "Tools"];
  const productsByCategory = {
    Cars: ["Sedan", "SUV", "Truck"],
    Electronics: ["Laptop", "Phone", "Tablet"],
    Food: ["Snacks", "Beverages", "Condiments"],
    Sewing: ["Thread", "Needle", "Sewing Machine"],
    Tools: ["Hammer", "Drill", "Wrench"],
  };

  // ✅ Handle category change
  const handleCategoryChange = (customerId, category) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [customerId]: productsByCategory[category] || [],
    }));
  };

  // ✅ Save customer pricing
  const handleSave = async (e, customerId) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const product = form.product.value;
    const tier = parseInt(form.priceTier.value);

    const payload = {
      salesman_id: salesman.id,
      customer_id: customerId,
      product_category: category,
      product_name: product,
      price_tier_id: tier,
    };

    try {
      const response = await fetch("http://localhost:3000/customer_pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to save pricing");
      }

      const data = await response.json();
      alert(`✅ ${data.message || `Pricing saved for ${product}`}`);
    } catch (err) {
      console.error("Error saving pricing:", err);
      alert("Error saving pricing. Please try again.");
    }
  };

  // ✅ Display loading/error states
  if (loading) return <p className="loading">Loading customers...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!salesman) return <p>Loading salesman info...</p>;

  // ✅ Main content
  return (
    <div className="salesman-container">
      {/* SALESMAN INFO */}
      <section className="salesman-info">
        <h1 className="page-title">Salesman Dashboard</h1>

        <div className="salesman-card">
          <h2>{salesman.name}</h2>
          <p>
            <strong>ID:</strong> {salesman.id}
          </p>
          <p>
            <strong>Email:</strong> {salesman.email}
          </p>
          <p>
            <strong>Region:</strong> {salesman.region}
          </p>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </section>

      {/* CUSTOMER MANAGEMENT */}
      <section className="customer-section">
        <h2 className="section-title">Client Management</h2>
        <p className="section-description">
          Manage your assigned customers and update their pricing categories.
        </p>

        <div className="customer-list">
          {customers.length === 0 ? (
            <p>No customers assigned to you yet.</p>
          ) : (
            customers.map((customer) => (
              <div className="customer-card" key={customer.user_id}>
                <div className="client-info">
                  <h3>{customer.company_name}</h3>
                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {customer.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="status">{customer.account_status}</span>
                  </p>
                </div>

                <form
                  onSubmit={(e) => handleSave(e, customer.user_id)}
                  className="price-form"
                >
                  <label>
                    Product Category:
                    <select
                      name="category"
                      required
                      onChange={(e) =>
                        handleCategoryChange(customer.user_id, e.target.value)
                      }
                    >
                      <option value="">Select a category</option>
                      {productCategories.map((cat, i) => (
                        <option key={i} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Product:
                    <select name="product" required>
                      <option value="">Select a product</option>
                      {selectedProducts[customer.user_id]?.map((prod, i) => (
                        <option key={i} value={prod}>
                          {prod}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Price Tier:
                    <select name="priceTier" required>
                      <option value="1">Standard</option>
                      <option value="2">Preferred</option>
                      <option value="3">Bulk</option>
                      <option value="4">Wholesale</option>
                    </select>
                  </label>

                  <button type="submit" className="save-btn">
                    Save
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default SalesmanPage;
