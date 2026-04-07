
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const MyOrders = () => {
  const userDetails= useSelector((appStore)=> appStore.user.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${userDetails.user.id}`);
        console.log("orders list",res.data)
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [userDetails.user.id]);


  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded">
              <div className="flex justify-between">
                <span className="font-semibold">Order #{order._id}</span>
                <span className={`font-bold ${order.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-red-600">Items:</h3>
                <ul className="ml-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.itemName} × {item.quantity} — ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              {order.tables.length > 0 && (
                <div className="mt-2">
                  <h3 className="font-medium text-red-600">Reserved Tables:</h3>
                  <ul className="ml-4 list-disc">
                    {order.tables.map((table) => (
                      <li key={table._id}>
                        Table {table.tableNumber} (Capacity {table.capacity})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-2 flex justify-between">
                <span>Delivery Fee: ₹{order.deliveryFee}</span>
                <span className="font-bold">Total: ₹{order.totalAmount}</span>
              </div>
                <div className="py-4">
                <button className="p-2 m-2 bg-green-700 font-mediun text-white border border-black rounded-lg">Track Your Order</button>
                <button className="p-2 m-2 bg-green-700 font-mediun text-white border border-black rounded-lg">
                  <Link to={`/body/review`} state={{userId:order.userId,resId:order.restaurantId,items:order.items[0].itemName}}>Write Review & Get Points</Link>
                  </button>
                </div>

            </li>
          
          ))}
        </ul>
      )}
    
    </div>
  );
};

export default MyOrders;