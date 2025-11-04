import { useEffect, useState } from "react";
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://localhost:3000/users");
      if (res.ok) setUsers(await res.json());
    }
    fetchUsers();
  }, []);

  //  Save order status via POST
  async function saveOrderStatus(order) {
    const payload = {
      customer_id: order.customer_id,
      order_date: order.order_date,
      total_amount: order.total_amount,
      order_status: order.order_status,
      assigned_service_rep: order.assigned_service_rep,
      created_date: order.created_date
    };

    const res = await fetch(`http://localhost:3000/orders/:id/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Order status updated!");
    } else {
      alert("Failed to update order.");
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

              {/* ✅ Dropdown updates state immediately */}
              <td>
                <select
                  value={o.order_status}
                  onChange={(e) =>
                    setOrders((prev) =>
                      prev.map((ord) =>
                        ord.id === o.id ? { ...ord, order_status: e.target.value } : ord
                      )
                    )
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>

              {/* ✅ Save button triggers POST */}
              <td>
                <button onClick={(e) => { e.stopPropagation(); saveOrderStatus(o); }}>
                  Save
                </button>
              </td>

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
