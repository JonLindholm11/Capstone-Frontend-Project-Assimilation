import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
import { getCustomersForSalesman, saveCustomerPricing } from "./api";
import DisplaySalesman from "./DisplaySalesman";
import CustomerList from "./CustomerList";
import { patchApiDataForCustomerPricing } from "./api";
import "./SalesPage.css";

function SalesmanPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [salesman, setSalesman] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

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

  useEffect(() => {
    if (!salesman?.id) return;

    const fetchCustomers = async () => {
      try {
        const data = await getCustomersForSalesman(salesman.id);
        setCustomers(data);
        if (data.length === 0) setError("No customers assigned.");
      } catch (err) {
        console.error("Fetch customers failed:", err);
        setError("Could not load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token, salesman]);

const handleSavePricing = async (pricingData) => {
  try {
    if (pricingData.pricing_id) {
      await patchApiDataForCustomerPricing(
        pricingData.pricing_id, 
        pricingData
      );
    } else {
      await saveCustomerPricing(pricingData);
    }
  } catch (err) {
    console.error("Error message:", err.message);
  }
};


  if (loading) return <p className="loading">Loading customers...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!salesman) return <p>Loading salesman info...</p>;

  return (
    <div className="salesman-container">
      <DisplaySalesman salesman={salesman} onLogout={logout} />
      <CustomerList customers={customers} onSavePricing={handleSavePricing} />
    </div>
  );
}

export default SalesmanPage;
