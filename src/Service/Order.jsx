import { useEffect, useState } from "react";
import "./order.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterDate,] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [setMessage] = useState("");

  // Supported statuses
  const statusOptions = ["pending", "active", "shipping", "issue"];

  // Fetch Orders
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch(`${API}/orders`);
      if (res.ok) setOrders(await res.json());
    }
    fetchOrders();
  }, []);

  // Fetch Order Items
  useEffect(() => {
    async function fetchOrderItems() {
      const res = await fetch(`${API}/order_items`);
      if (res.ok) setOrderItems(await res.json());
    }
    fetchOrderItems();
  }, []);

  // Fetch Customers
  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch(`${API}/customers`);
      if (res.ok) setCustomers(await res.json());
    }
    fetchCustomers();
  }, []);

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${API}/products`);
      if (res.ok) setProducts(await res.json());
    }
    fetchProducts();
  }, []);

  async function saveOrderStatus(order) {
    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch(
        `${API}/orders/${order.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order_status: order.order_status }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update");
      setMessage(` Order #${order.id} status updated to ${order.order_status}`);
    } catch (err) {
      setMessage(` ${err.message}`);
    }
  }

  const getCompanyOrContactName = (id) => {
    const customer = customers.find((c) => c.id === id);

    if (customer?.company_name) {
      return customer.company_name;
    } else if (customer?.contact_name) {
      return customer.contact_name;
    } else {
      return "No information provided";
    }
  };

  const getProductName = (id) => {
    return products.find((p) => p.id === id)?.product_name ?? `Product #${id}`;
  };

  const filteredOrders = filterDate
    ? orders.filter((o) => o.order_date === filterDate)
    : orders;
  const selectedItems = orderItems.filter(
    (i) => i.order_id === selectedOrderId
  );

  return (
    <div className="container">
      <h1 className="title">Order Dashboard</h1>

      <div className="order-dashboard-layout">
        <div className="orderList">
          <h2 className="subtitle">Orders</h2>
          <table className="orderTable">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Company or Contact</th>
                <th>Total</th>
                <th>Status</th>
                <th>Save</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((orders) => (
                <tr
                  key={orders.id}
                  onClick={() => setSelectedOrderId(orders.id)}
                  className={selectedOrderId === orders.id ? "selected" : ""}
                >
                  <td>{orders.id}</td>
                  <td>{getCompanyOrContactName(orders.customer_id)}</td>
                  <td>${orders.total_amount}</td>

                  {/* Dropdown updates state immediately */}
                  <td>
                    <select
                      value={orders.order_status}
                      onChange={(e) =>
                        setOrders((prev) =>
                          prev.map((order) =>
                            order.id === orders.id
                              ? { ...order, order_status: e.target.value }
                              : order
                          )
                        )
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Save button triggers POST */}
                  <td>
                    <button
                      className="saveBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveOrderStatus(orders);
                      }}
                    >
                      Save
                    </button>
                  </td>
                  <td>
                      {orders.order_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="details">
          {selectedOrderId ? (
            <>
              <h3 className="subtitle">Order #{selectedOrderId} Items</h3>
              <table className="orderTable">
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
          ) : (
            <div className="placeholder">
              <p>Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
