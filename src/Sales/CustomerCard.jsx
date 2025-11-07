import { useState, useEffect } from "react";
import { getCustomerPricing } from "./api";

export default function CustomerCard({ customer, onSave }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [existingPricing, setExistingPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  const productCategories = ["Cars", "Electronics", "Food", "Sewing", "Tools"];

  const priceTierNames = {
    1: "Standard",
    2: "Preferred",
    3: "Bulk",
    4: "Wholesale"
  };

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const pricing = await getCustomerPricing(customer.id);
        setExistingPricing(pricing);
      } catch (error) {
        console.error("Error fetching pricing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, [customer.id]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const pricingData = {
      customer_id: customer.id,
      product_category: form.category.value,
      price_tier_id: parseInt(form.priceTier.value),
    };

    try {
      
      const categoryPricing = existingPricing.find(
        p => p.product_category === form.category.value
      );

      if (categoryPricing) {
        pricingData.pricing_id = categoryPricing.id;
      } else {
        console.log("No existing pricing found for this category");
      }

      await onSave(pricingData);
      
      const updatedPricing = await getCustomerPricing(customer.id);
      setExistingPricing(updatedPricing);
      
      form.reset();
      setSelectedCategory("");
    } catch (error) {
      console.error("Error in CustomerCard:", error);
    }
  };

  return (
    <div className="customer-card">
      <div className="client-info">
        <h3>{customer.company_name}</h3>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="status">{customer.account_status}</span>
        </p>
      </div>

      <div className="current-pricing">
        <h4>Current Pricing</h4>
        {loading ? (
          <p>Loading pricing...</p>
        ) : existingPricing.length > 0 ? (
          <ul className="pricing-list">
            {existingPricing.map((pricing) => (
              <li key={pricing.id}>
                <strong>{pricing.product_category}:</strong>{" "}
                {priceTierNames[pricing.price_tier_id] || `Tier ${pricing.price_tier_id}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-pricing">No pricing set yet</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="price-form">
        <label>
          Product Category:
          <select
            name="category"
            required
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
  );
}