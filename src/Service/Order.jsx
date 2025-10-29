import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Fetch all order items (only once)
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch("/api/order_items");
        const data = await response.json();
        setOrderItems(data);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchOrderItems();
  }, []);

  // Unique dates for dropdown
  const uniqueDates = [...new Set(orders.map((o) => o.order_date))];

  // Filter by date
  const filteredOrders =
    filterDate === "" ? orders : orders.filter((o) => o.order_date === filterDate);

  // Items for the selected order
  const selectedItems = orderItems.filter((i) => i.order_id === selectedOrderId);

  return (
    <div style={{ padding: "20px" }}>
      <h1>check your order</h1>

     {/* date filter */}
      <label style={{ marginRight: "10px" }}>
        Filter by Date:
      </label>
      <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
        <option value="">All Dates</option>
        {uniqueDates.map((date) => (
          <option value={date} key={date}>
            {date}
          </option>
        ))}
      </select>

      {/* Orders Table */}
      <h2 style={{ marginTop: "20px" }}>Orders</h2>
      <table border="1" cellPadding="6" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
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
              style={{ cursor: "pointer", background: selectedOrderId === o.id ? "#f1f1f1" : "" }}
              onClick={() => setSelectedOrderId(o.id)}
            >
              <td>{o.id}</td>
              <td>{o.customer_id}</td>
              <td>{o.order_date}</td>
              <td>${o.total_amount}</td>
              <td>{o.order_status}</td>
              <td>{o.assigned_service_rep}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Items Display */}
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
                  <td>{item.product_id}</td>
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
