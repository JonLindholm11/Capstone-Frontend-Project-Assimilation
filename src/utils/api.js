// //RoleSelection component will be able to import and use these API functions!
// // API utility for making backend requests
// const API_BASE_URL = 'http://localhost:3000';

// // function to get token from sessionStorage
// const getToken = () => sessionStorage.getItem('token');

// // function to make authenticated requests
// const fetchWithAuth = async (url, options = {}) => {
//   const token = getToken();
//   const headers = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     throw new Error(error || `HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };

// //USER ENDPOINTS
// export const getUsers = async () => {
//   return fetchWithAuth(`${API_BASE_URL}/users`);
// };

// export const updateUserRole = async (userId, roleId) => {
//   return fetchWithAuth(`${API_BASE_URL}/users/${userId}/role`, {
//     method: 'PUT',
//     body: JSON.stringify({ role_id: roleId }),
//   });
// };

// export const deleteUser = async (userId) => {
//   return fetchWithAuth(`${API_BASE_URL}/users/${userId}`, {
//     method: 'DELETE',
//   });
// };

// // CUSTOMER ENDPOINTS 
// export const getCustomers = async () => {
//   return fetchWithAuth(`${API_BASE_URL}/customers`);
// };

// export const getCustomerById = async (customerId) => {
//   return fetchWithAuth(`${API_BASE_URL}/customers/${customerId}`);
// };

// export const createCustomer = async (customerData) => {
//   return fetchWithAuth(`${API_BASE_URL}/customers`, {
//     method: 'POST',
//     body: JSON.stringify(customerData),
//   });
// };

// export const updateCustomer = async (customerId, customerData) => {
//   return fetchWithAuth(`${API_BASE_URL}/customers/${customerId}`, {
//     method: 'PUT',
//     body: JSON.stringify(customerData),
//   });
// };

// export const deleteCustomer = async (customerId) => {
//   return fetchWithAuth(`${API_BASE_URL}/customers/${customerId}`, {
//     method: 'DELETE',
//   });
// };

// // ORDER ENDPOINTS 
// export const getOrders = async () => {
//   return fetchWithAuth(`${API_BASE_URL}/orders`);
// };

// export const getOrderById = async (orderId) => {
//   return fetchWithAuth(`${API_BASE_URL}/orders/${orderId}`);
// };

// export const createOrder = async (orderData) => {
//   return fetchWithAuth(`${API_BASE_URL}/orders`, {
//     method: 'POST',
//     body: JSON.stringify(orderData),
//   });
// };

// export const updateOrder = async (orderId, orderData) => {
//   return fetchWithAuth(`${API_BASE_URL}/orders/${orderId}`, {
//     method: 'PUT',
//     body: JSON.stringify(orderData),
//   });
// };

// export const deleteOrder = async (orderId) => {
//   return fetchWithAuth(`${API_BASE_URL}/orders/${orderId}`, {
//     method: 'DELETE',
//   });
// };

// //  PRODUCT ENDPOINTS 
// export const getProducts = async () => {
//   return fetchWithAuth(`${API_BASE_URL}/products`);
// };

// export const getProductById = async (productId) => {
//   return fetchWithAuth(`${API_BASE_URL}/products/${productId}`);
// };

// // SPECIAL PRICING ENDPOINTS 
// export const getSpecialPricing = async () => {
//   return fetchWithAuth(`${API_BASE_URL}/special_pricing`);
// };

// export const getSpecialPricingById = async (pricingId) => {
//   return fetchWithAuth(`${API_BASE_URL}/special_pricing/${pricingId}`);
// };

// export const createSpecialPricing = async (pricingData) => {
//   return fetchWithAuth(`${API_BASE_URL}/special_pricing`, {
//     method: 'POST',
//     body: JSON.stringify(pricingData),
//   });
// };

// export const updateSpecialPricing = async (pricingId, pricingData) => {
//   return fetchWithAuth(`${API_BASE_URL}/special_pricing/${pricingId}`, {
//     method: 'PUT',
//     body: JSON.stringify(pricingData),
//   });
// };

// export const deleteSpecialPricing = async (pricingId) => {
//   return fetchWithAuth(`${API_BASE_URL}/special_pricing/${pricingId}`, {
//     method: 'DELETE',
//   });
// };