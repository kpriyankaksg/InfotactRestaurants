
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);

  const Current_res_details = useSelector((appStore) => appStore.restaurant.restaurant );

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

  useEffect(() => {
  const fetchRevenue = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/order/revenue/${Current_res_details._id}`
      );
      const yesterdayRes = await axios.get(
        `http://localhost:5000/api/order/revenue/yesterday/${Current_res_details._id}`
      );

      console.log(res.data);
      setDailyRevenue(res.data.dailyRevenue);
       setYesterdayRevenue(yesterdayRes.data.yesterdayRevenue);

    } catch (err) {
      console.error("Error fetching revenue:", err.message);
    }
  };

  if (Current_res_details?._id) fetchRevenue();
}, [Current_res_details]);

    const diff = dailyRevenue - yesterdayRevenue;
    const percentChange =
      yesterdayRevenue > 0
        ? ((diff / yesterdayRevenue) * 100).toFixed(1)
        : 0;
    const trendText =
      diff > 0
        ? `↑ ₹${diff} higher than yesterday (+${percentChange}%)`
        : diff < 0
        ? `↓ ₹${Math.abs(diff)} lower than yesterday (${percentChange}%)`
        : "No change compared to yesterday";


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
                 <p><strong>Items:</strong><strong className="text-red-600"> {item.itemName}</strong></p>
              ))}
              <p><strong>Total:</strong><strong className="text-red-600"> ₹{order.totalAmount}</strong></p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

        {/* today's revenue */}
              <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-xl shadow-lg flex items-center justify-between mt-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-green-600 font-bold rounded-lg px-3 py-2 text-lg">
              {new Date().getDate()}
            </div>
            <div>
              <h3 className="text-xl font-semibold">Today's Revenue</h3>
              <p className="text-3xl font-bold mt-1">₹{dailyRevenue}</p>
              <p className={`text-sm mt-1 ${
                diff >= 0 ? "text-green-200" : "text-red-200" }`} >
               {trendText}
              </p>
            </div>
          </div>
          <div className="flex space-x-1 items-end">
            <div className="w-3 h-6 bg-white rounded"></div>
            <div className="w-3 h-8 bg-white rounded"></div>
            <div className="w-3 h-10 bg-white rounded"></div>
            <div className="w-3 h-12 bg-white rounded"></div>
          </div>
        </div>
    </div>
  );
};

export default RecentOrders;