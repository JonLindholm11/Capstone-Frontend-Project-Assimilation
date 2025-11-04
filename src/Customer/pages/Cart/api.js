const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function postApiDataForCustomers(customerData) {
  const token = sessionStorage.getItem('token');

  const response = await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerData)
  })

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data
}