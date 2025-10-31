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
      const response = await fetch(`${API}/customers`); //  Removed auth header - backend doesn't require it

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
      //  Backend has no GET /users endpoint yet
      // Using mock data until backend adds GET /users/employees
      setError("GET /users/employees endpoint not available - using mock data");
      
      setSalesmen([
        { id: 1, email: "salesman1@company.com", role_id: 2 },
        { id: 2, email: "salesman2@company.com", role_id: 2 }
      ]);
      
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

    // We have to update Backend has no PUT /customers/:id endpoint yet
    setError("PUT /customers/:id endpoint not available - cannot update customer");
    
    /* Uncomment this when backend adds the endpoint:
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

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Salesman assigned successfully!");
        fetchCustomers();
      } else {
        setError(result.message || result.error || "Failed to assign salesman");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
    */
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