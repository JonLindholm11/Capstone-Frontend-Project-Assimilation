import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext"; // ADDED
import { useNavigate } from "react-router"; // ADDED
import "./SalesPage.css";

function SalesmanPage({ salesman }) {
  const { token } = useAuth(); //  ADDED
  const navigate = useNavigate(); // ADDED
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // Jodson - AUTHENTICATION CHECK - ADDED
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      if (payload.role_id !== 2) {
        alert('Access Denied! Only salesmen can access this page.');
        navigate('/');
        return;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [token, navigate]);
  // END OF AUTHENTICATION CHECK 

  // 🧪 TEMP LOGIN (for testing)
  if (!salesman) {
    salesman = {
      id: 1,
      name: "Test Salesman",
      email: "salesman@test.com",
      region: "Midwest Sales Division",
    };
  }

  // Product Categories
  const productCategories = ["Cars", "Electronics", "Food", "Sewing", "Tools"];

  // Simulated customers
  useEffect(() => {
    const mockCustomers = [
      {
        user_id: 4,
        company_name: "Test Company",
        email: "customer1@email.com",
        account_status: "active",
        location: "Chicago, IL",
        phone: "(312) 555-0147",
      },
      {
        user_id: 5,
        company_name: "BuildCo Inc",
        email: "customer2@email.com",
        account_status: "active",
        location: "St. Louis, MO",
        phone: "(636) 555-0098",
      },
    ];
    setTimeout(() => {
      setCustomers(mockCustomers);
      setLoading(false);
    }, 600);
  }, [salesman]);

  const handleSave = (e, customerId) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const product = form.product.value;
    const tier = form.priceTier.value;

    const payload = {
      customer_id: customerId,
      product_category: category,
      product_name: product,
      price_tier_id: parseInt(tier),
    };

    console.log("Saving payload:", payload);
    alert(`Saved pricing for ${product} to customer #${customerId}`);
  };

  if (loading) return <p className="loading">Loading customers...</p>;

  return (
    <div className="salesman-container">
      {/*  SALESMAN INFO SECTION */}
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
        </div>
      </section>

      {/*  CUSTOMER MANAGEMENT SECTION  */}
      <section className="customer-section">
        <h2 className="section-title">Client Management</h2>
        <p className="section-description">
          Manage your assigned customers and update their pricing categories.
        </p>

        <div className="customer-list">
          {customers.map((customer) => (
            <div className="customer-card" key={customer.user_id}>
              {/* CLIENT INFO BLOCK */}
              <div className="client-info">
                <h3>{customer.company_name}</h3>
                <p>
                  <strong>Email:</strong> {customer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {customer.phone}
                </p>
                <p>
                  <strong>Location:</strong> {customer.location}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="status">{customer.account_status}</span>
                </p>
              </div>

              {/* PRICE ASSIGNMENT FORM */}
              <form
                className="price-form"
                onSubmit={(e) => handleSave(e, customer.user_id)}
              >
                <label>
                  Product Category:
                  <select
                    name="category"
                    required
                    onChange={(e) => {
                      const selected = e.target.value;
                      const form = e.target.closest("form");
                      const productSelect = form.querySelector(
                        'select[name="product"]'
                      );
                      if (productSelect) {
                        productSelect.innerHTML = "";
                        if (productsByCategory[selected]) {
                          productsByCategory[selected].forEach((prod) => {
                            const option = document.createElement("option");
                            option.value = prod;
                            option.textContent = prod;
                            productSelect.appendChild(option);
                          });
                        }
                      }
                    }}
                  >
                    <option value="">Select a category</option>
                    {productCategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Product:
                  <select name="product" required>
                    <option value="">Select a product</option>
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
          ))}
        </div>
      </section>
    </div>
  );
}

export default SalesmanPage;