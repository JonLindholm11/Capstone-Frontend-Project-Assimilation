import { useEffect, useState } from "react";


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch Orders
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch(` http://localhost:3000/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        console.error("Failed to load orders");
      }
    }
    fetchOrders();
  }, []);

  // Fetch Order Items
  useEffect(() => {
    async function fetchOrderItems() {
      const res = await fetch(` http://localhost:3000/order_items`);
      if (res.ok) {
        const data = await res.json();
        setOrderItems(data);
      } else {
        console.error("Failed to load order items");
      }
    }
    fetchOrderItems();
  }, []);

  // Fetch Customers
  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch(`http://localhost:3000/customers`);
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      } else {
        console.error("Failed to load customers");
      }
    }
    fetchCustomers();
  }, []);

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`http://localhost:3000/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error("Failed to load products");
      }
    }
    fetchProducts();
  }, []);

  // Fetch Users
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(``);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        console.error("Failed to load users");
      }
    }
    fetchUsers();
  }, []);

  
  const getCompanyName = (id) =>{
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      return customer.company_name;
    } else {
      return "Unknown";
    }
  }

  const getRepEmail=(id)=>{
    const rep = users.find((u) => u.id === id);
    if (rep) {
      return rep.email;
    } else {
      return "Not Assigned";
    }
  }

  const getProductName=(id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      return product.product_name;
    } else {
      return `Product #${id}`;
    }
  }

  const uniqueDates = [...new Set(orders.map((o) => o.order_date))];

  const filteredOrders =
    filterDate === "" ? orders : orders.filter((o) => o.order_date === filterDate);

  const selectedItems = orderItems.filter((i) => i.order_id === selectedOrderId);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Check Your Order</h1>

      <label>Filter by Date:</label>
      <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
        <option value="">All Dates</option>
        {uniqueDates.map((date) => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>

      <h2 style={{ marginTop: "20px" }}>Orders</h2>
      <table border="1" cellPadding="6" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Company</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Service Rep</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((o) => (
            <tr
              key={o.id}
              onClick={() => setSelectedOrderId(o.id)}
              style={{
                cursor: "pointer",
                background: selectedOrderId === o.id ? "#f1f1f1" : "",
              }}
            >
              <td>{o.id}</td>
              <td>{getCompanyName(o.customer_id)}</td>
              <td>{o.order_date}</td>
              <td>${o.total_amount}</td>
              <td>{o.order_status}</td>
              <td>{getRepEmail(o.assigned_service_rep)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrderId && (
        <>
          <h3>Order #{selectedOrderId} Items</h3>
          <table border="1" cellPadding="6" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item.id}>
                  <td>{getProductName(item.product_id)}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

