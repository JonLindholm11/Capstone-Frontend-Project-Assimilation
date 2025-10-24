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
      const response = await fetch(`${API}/customers`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

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
      const response = await fetch(`${API}/users`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const allUsers = await response.json();
        // Filter users with role_id = 2 (Salesmen)
        const salesmenOnly = allUsers.filter(user => user.role_id === 2);
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

  const handleSalesmanAssignment = async (customerId) => {
    setMessage("");
    setError("");

    const selectedSalesmanId = document.getElementById(`salesman-${customerId}`).value;

    if (!selectedSalesmanId) {
      setError("Please select a salesman");
      return;
    }

    try {
      const response = await fetch(`${API}/customers/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          assigned_salesman_id: parseInt(selectedSalesmanId)
        })
      });

      if (response.ok) {
        setMessage("Salesman assigned successfully!");
        fetchCustomers();
      } else {
        const errorText = await response.text();
        setError(errorText || "Failed to assign salesman");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
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
      <p>Assign salesmen to manage customer accounts</p>

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
                <th>Assign Salesman</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.company_name || "N/A"}</td>
                  <td>{customer.contact_name || "N/A"}</td>
                  <td>{customer.email}</td>
                  <td>{getSalesmanName(customer.assigned_salesman_id)}</td>
                  <td>
                    <select 
                      id={`salesman-${customer.id}`}
                      defaultValue={customer.assigned_salesman_id || ""}
                      className="salesman-select"
                    >
                      <option value="">Select a salesman...</option>
                      {salesmen.map(salesman => (
                        <option key={salesman.id} value={salesman.id}>
                          {salesman.email}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleSalesmanAssignment(customer.id)}
                      className="save-btn"
                    >
                      Save
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

export default SalesmanSelection;