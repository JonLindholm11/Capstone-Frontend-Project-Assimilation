import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API;

function SalesmanSelection({ token }) {
  const [customers, setCustomers] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
    fetchSalesmen();
  }, []);

  const fetchCustomers = async () => {
    try {
      // Backend: GET /customers (no auth required)
      const response = await fetch(`${API}/customers`);

      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        setError("Failed to fetch customers");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
  };

  const fetchSalesmen = async () => {
    try {
      // Backend: GET /users/employees (requires auth, admin only)
      const response = await fetch(`${API}/users/employees`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Filter for salesmen only (role_id = 2)
        const salesmenOnly = data.filter(user => user.role_id === 2);
        setSalesmen(salesmenOnly);
      } else {
        setError("Failed to fetch salesmen");
      }
      setLoading(false);
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
      setLoading(false);
    }
  };

  const getSalesmanName = (salesmanId) => {
    const salesman = salesmen.find(s => s.id === salesmanId);
    return salesman ? salesman.email : "Not assigned";
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div className="salesman-selection-section">
      <h2>Salesman Selection for Customers</h2>
      <p>View customer-salesman assignments</p>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="customers-list">
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Contact Name</th>
                <th>Email</th>
                <th>Current Salesman</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.company_name || "N/A"}</td>
                  <td>{customer.contact_name || "N/A"}</td>
                  <td>{customer.email}</td>
                  <td>{getSalesmanName(customer.assigned_salesman_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SalesmanSelection;