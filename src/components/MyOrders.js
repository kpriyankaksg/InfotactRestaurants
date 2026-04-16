
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
        const res = await axios.get(`http://localhost:5000/api/order/user/${userDetails.user.id}`);
        console.log("orders list",res.data)
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      
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
               <span className="font-bold">Total: ₹{order.totalAmount}</span>
              <span className={`font-bold ${order.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                {order.status}
              </span>
            </div>

      {order.restaurants.map((resBlock, idx) => (
        <div key={idx} className="mt-4 border-t pt-2">
          <h3 className="font-medium text-red-600">
          {resBlock.restaurantName || resBlock.restaurantId?.name}
          </h3>

              {/* Items */}
          {resBlock.items?.length > 0 && (
            <ul className="ml-4 list-disc">
              {resBlock.items.map((item) => (
                <li key={item._id}>
                  {item.itemName} × {item.quantity} — ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          )}

          {/* Tables */}
          {resBlock.tables?.length > 0 && (
            <ul className="ml-4 list-disc">
              {resBlock.tables.map((table) => (
                <li key={table._id}>
                  Table {table.tableNumber} (Capacity {table.capacity})
                  {table.reservationDateTime && (
                    <> — Reserved for {new Date(table.reservationDateTime).toLocaleString()}</>
                  )}
                </li>
              ))}
            </ul>
          )}
          
        {/* Track + Review buttons */}
          {/* <div className="py-2">
            <Link to={`/body/tracking` } 
            state={{
                    restaurantDetails: {
                      name: resBlock.restaurantName || resBlock.restaurantId?.name,
                      postalCode: resBlock.postalCode || resBlock.restaurantId?.postalCode,
                      location: resBlock.restaurantId?.location?.coordinates // [lon, lat]
                    }
                  }}
                >
            <button className="p-2 m-2 bg-green-700 text-white rounded-lg">
              Track Order
            </button>
            </Link>  */}
            {!resBlock.tables?.some(table => table.reservationDateTime) && (
              <Link
                to={`/body/tracking`}
                state={{
                  restaurantDetails: {
                    name: resBlock.restaurantName || resBlock.restaurantId?.name,
                    postalCode: resBlock.postalCode || resBlock.restaurantId?.postalCode,
                    location: resBlock.restaurantId?.location?.coordinates // [lon, lat]
                  }
                }}
              >
                <button className="p-2 m-2 bg-green-700 text-white rounded-lg">
                  Track Order
                </button>
              </Link>
            )}
            <Link
              to={`/body/review`}
              state={{
                userId: order.userId,
                resId: resBlock.restaurantId,
                items: resBlock.items.map(i => i.itemName) // pass all item names
              }}
              className="p-2 m-2 bg-green-700 text-white rounded-lg inline-block"
            >
              Write Review & Get Points
            </Link>
          </div>
       // </div>
          ))}
          </li>
            ))}
          </ul>
                )}
                </div>
            )
          }



export default MyOrders;