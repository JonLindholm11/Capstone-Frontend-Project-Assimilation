import { useEffect, useState } from "react";
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, ] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [ setMessage] = useState("");
  
  
  

  // Supported statuses
  const statusOptions = ["pending", "active", "shipping", "issue"];

  // Fetch Orders
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("http://localhost:3000/orders");
      if (res.ok) setOrders(await res.json());
    }
    fetchOrders();
  }, []);

  // Fetch Order Items
  useEffect(() => {
    async function fetchOrderItems() {
      const res = await fetch("http://localhost:3000/order_items");
      if (res.ok) setOrderItems(await res.json());
    }
    fetchOrderItems();
  }, []);

  // Fetch Customers
  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch("http://localhost:3000/customers");
      if (res.ok) setCustomers(await res.json());
    }
    fetchCustomers();
  }, []);

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:3000/products");
      if (res.ok) setProducts(await res.json());
    }
    fetchProducts();
  }, []);

  // Fetch Users 
  // useEffect(() => {
  //   async function fetchUsers() {
  //     const res = await fetch("http://localhost:3000/users");
  //     if (res.ok) setUsers(await res.json());
  //   }
  //   fetchUsers();
  // }, []);

  //  Save order status via POST
  
  async function saveOrderStatus(order) {
    try {
      const res = await fetch(`http://localhost:3000/orders/${order.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ order_status: order.order_status })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update");
      setMessage(` Order #${order.id} status updated to ${order.order_status}`);
    } catch (err) {
      setMessage(` ${err.message}`);
    }
  }

  

  const getCompanyName = (id) =>
    customers.find((c) => c.id === id)?.company_name ?? "Unknown";

  const getRepEmail = (id) =>
    users.find((u) => u.id === id)?.email ?? "Not Assigned";

  const getProductName = (id) =>
    products.find((p) => p.id === id)?.product_name ?? `Product #${id}`;

  const uniqueDates = [...new Set(orders.map((o) => o.order_date))];
  const filteredOrders = filterDate ? orders.filter((o) => o.order_date === filterDate) : orders;
  const selectedItems = orderItems.filter((i) => i.order_id === selectedOrderId);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer Service Order Dashboard</h1>

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
            <th>Save</th>
            <th>Service Rep</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((orders) => (
            <tr
              key={orders.id}
              onClick={() => setSelectedOrderId(orders.id)}
              style={{
                cursor: "pointer",
                background: selectedOrderId === orders.id ? "#f1f1f1" : "",
              }}
            >
              <td>{orders.id}</td>
              <td>{getCompanyName(orders.customer_id)}</td>
              <td>{orders.order_date}</td>
              <td>${orders.total_amount}</td>

              {/* Dropdown updates state immediately */}
              <td>
                <select
                  value={orders.order_status}
                  onChange={(e) =>
                    setOrders((prev) =>
                      prev.map((order) =>
                        order.id === orders.id ? { ...order, order_status: e.target.value } : order
                      )
                    )
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>

              {/* Save button triggers POST */}
              <td>
                <button onClick={(e) => { e.stopPropagation(); saveOrderStatus(orders); }}>
                  Save
                </button>
              </td>

              <td>{getRepEmail(orders.assigned_service_rep)}</td>
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
