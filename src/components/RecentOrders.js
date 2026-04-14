
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("recentOrders", (orders) => {
      console.log("Missed orders:", orders);
      setOrders(orders);
    });

    socket.on("newOrder", (order) => {
      console.log("New order received:", order);
      setOrders((prev) => [...prev, order]); // append new order live
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="pt-24 ml-64 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Recent Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders today.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded bg-white shadow">
              <p><strong>Restaurant:</strong> {order.restaurants[0]?.restaurantId?.name}</p>
              {(order.restaurants[0].items).map((item)=>(
                 <p><strong>Itmes:</strong> {item.itemName}</p>
              ))}
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentOrders;