import React, { useState, useEffect } from 'react';
import "./orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assetsss/assets";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // ✅ Optimistic UI: update state first, then backend
  const handleStatusChange = async (orderId, newStatus) => {
    // Update state immediately
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    try {
      const response = await axios.put(`${url}/api/order/status`, {
        orderId,
        status: newStatus
      });

      if (!response.data.success) {
        toast.error("Failed to update status");
        fetchAllOrders(); // revert if failed
      } else {
        toast.success("Status updated");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
      fetchAllOrders(); // revert if error
    }
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-table-container">
        <div className="order-table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Parcel</th>
                <th>Food Items</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td data-label="Parcel">
                    <img src={assets.parcel_icon} alt="parcel" className="parcel-icon" />
                  </td>
                  <td data-label="Food Items">
                    {order.items.map((item, idx) =>
                      idx === order.items.length - 1
                        ? `${item.name} x ${item.quantity}`
                        : `${item.name} x ${item.quantity}, `
                    )}
                  </td>
                  <td data-label="Customer">{order.name}</td>
                  <td data-label="Phone">{order.address.phone}</td>
                  <td data-label="Address">
                    {order.address.street}, {order.address.city}, {order.address.state}
                  </td>
                  <td data-label="Items">{order.items.length}</td>
                  <td data-label="Amount">₹{order.amount}</td>
                  <td data-label="Status">
                    <select
                      className="order-status"
                      value={order.status || "Food Processing"} // default value
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
