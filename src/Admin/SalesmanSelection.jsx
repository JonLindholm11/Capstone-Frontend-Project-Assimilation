import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API;

function SalesmanSelection({ token }) {
  const [customers, setCustomers] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [salesmanSelections, setSalesmanSelections] = useState({});

  useEffect(() => {
    const initialSelections = {};
    customers.forEach((customer) => {
      initialSelections[customer.id] = customer.assigned_salesman_id || "";
    });
    setSalesmanSelections(initialSelections);
  }, [customers]);

  useEffect(() => {
    fetchCustomers();
    fetchSalesmen();
  }, []);

  const fetchCustomers = async () => {
    try {

      const response = await fetch(`${API}/customers`);

      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        setError("Failed to fetch customers");
      }
    } catch (err) {
      console.log("Error:", err);
      setError("Error connecting to server");
      console.error(err);
    }
  };

  const fetchSalesmen = async () => {
    try {
      const response = await fetch(`${API}/users/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const salesmenOnly = data.filter((user) => user.role_id === 2);
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

  const handleManualRefresh = () => {
    setMessage("Refreshing...");
    fetchCustomers();
    fetchSalesmen();
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSalesmanAssignment = async (id) => {
    setMessage("");
    setError("");

    const selectedSalesmanId = document.getElementById(`salesman-${id}`).value;

    if (!selectedSalesmanId) {
      setError("Please select a salesman");
      return;
    }

    const payload = {
      assigned_salesman_id: parseInt(selectedSalesmanId, 10),
    };

    try {
      const response = await fetch(`${API}/customers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { message: text, error: text };
      }

      if (response.ok) {
        setMessage(result.message || "Salesman assigned successfully!");
        fetchCustomers();
      } else {
        setError(result.error || result.message || "Failed to assign salesman");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
  };

  const getSalesmanName = (salesmanId) => {
    const salesman = salesmen.find((s) => s.id === salesmanId);
    return salesman ? salesman.email : "Not assigned";
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div className="salesman-selection-section">
      <h2>Salesman Selection for Customers</h2>
      <p>Assign salesmen to manage customer accounts</p>

      <button onClick={handleManualRefresh} className="refresh-btn">
        Refresh List
      </button>

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
                <th>Customer Email</th>
                <th>Current Salesman</th>
                <th>Assign Salesman</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.company_name || "N/A"}</td>
                  <td>{customer.contact_name || "N/A"}</td>
                  <td>{customer.email}</td>
                  <td>{getSalesmanName(customer.assigned_salesman_id)}</td>
                  <td>
                    <select
                      id={`salesman-${customer.id}`}
                      value={
                        salesmanSelections[customer.id] ||
                        customer.assigned_salesman_id ||
                        ""
                      }
                      onChange={(e) =>
                        setSalesmanSelections({
                          ...salesmanSelections,
                          [customer.id]: e.target.value,
                        })
                      }
                      className="salesman-select"
                    >
                      <option value="">Select a salesman...</option>
                      {salesmen.map((salesman) => (
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
