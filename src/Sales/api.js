const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getCustomersForSalesman(salesmanId) {
  const token = sessionStorage.getItem("token");
  
  const response = await fetch(`${API}/customers/salesman/${salesmanId}`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.customers || [];
}

export async function getCustomerPricing(customerId) {
  const token = sessionStorage.getItem("token");
  
  const response = await fetch(`${API}/customer_pricing/customers/${customerId}`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.pricing || [];
}

export async function saveCustomerPricing(pricingData) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${API}/customer_pricing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pricingData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function patchApiDataForCustomerPricing(id, customerData) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${API}/customer_pricing/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}