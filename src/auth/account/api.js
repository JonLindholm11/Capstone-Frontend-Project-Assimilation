const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getApiDataForUsersMe() {
  const token = sessionStorage.getItem('token');;

  if (!token) {
    throw new Error('No token found - please log in');
  }

  const response = await fetch(`${API}/users/me`, {
    method: "GET",
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
  return data;
}

export async function getApiDataForOrderItems(orderId) {
  const token = sessionStorage.getItem('token');

  const response = await fetch(`${API}/order_items/order/${orderId}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data;
}