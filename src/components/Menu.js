import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setMenuItems } from "../utils/menuItemsSlice";
import { setTable } from "../utils/tableSlice";


const Menu = () => {
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const dispatch = useDispatch();
  const Current_res_details = useSelector((appStore) => appStore.restaurant.restaurant );
  const menuItems = useSelector((appStore) => appStore.menuItems.menuItems);
 // console.log("menus from redux", menuItems);
  const tables = useSelector((appStore) => appStore.table.table);
  //console.log("tables from redux", tables);

  useEffect(() => {
    if (Current_res_details?._id) {
      getMenuItemsList();
      getTablesList();
    }
  }, [Current_res_details]);


  //.....extra..........
    useEffect(() => {
  // const socket = io("http://localhost:5000", {
  //   transports: ["websocket"], // ensures stable connection
  // });
  const socket = io("http://localhost:5000");
  

  socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
  });
  socket.on("newOrder", (order) => {
    console.log("New order received:", order);
  });
  socket.on("recentOrders", (orders) => console.log("Missed orders:", orders));
  return () => socket.disconnect();
}, []);

useEffect(() => {
  const fetchRevenue = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/order/revenue/${Current_res_details._id}`
      );
      setDailyRevenue(res.data.dailyRevenue);
    } catch (err) {
      console.error("Error fetching revenue:", err.message);
    }
  };

  if (Current_res_details?._id) fetchRevenue();
}, [Current_res_details]);


//..........................................................



  // get menus list
  const getMenuItemsList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/getMenu/${Current_res_details._id}`
      );
      console.log("Menu List", response.data);
      dispatch(setMenuItems(response.data)); // triggers re-render
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const getTablesList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/getTables/${Current_res_details._id}`
      );
      console.log("Tables List", response.data);
      dispatch(setTable(response.data)); // triggers re-render
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  const handleAvailabilityToggle = async (id, newStatus) => {
  await axios.patch(`http://localhost:5000/api/items/${id}/status`, { available: newStatus });
  getMenuItemsList(); // refresh
  };


  const isEmpty =
    (!menuItems || menuItems.length === 0) &&
    (!tables || tables.length === 0);

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8">
        Menu & Seating Arrangement
      </h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXFt7AgX2KbHPoO7-ZrgnF-lnjfu2m3iwmlw&s"
            alt="Add your menu and seating arrangement"
            className="w-64 h-64 mb-4"
          />
          <p className="text-lg text-gray-600">
            Add your menu and seating arrangement from Home.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
           {/* Menu Items */}
          <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li
                  key={item._id}
                  className="border p-3 rounded flex justify-between items-center"
                >
                  {/* Left side: image + details */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span>
                      {item.itemName} - ₹{item.price} ({item.category})
                    </span>
                  </div>

                  {/* Right side: availability */}
                  {/* <span>
                    {item.available ? "✅ Available" : "❌ Not Available"}
                  </span> */}
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => handleAvailabilityToggle(item._id, !item.available)}
                      className="toggle-checkbox"
                    />


                </li>
              ))}
            </ul>
          </section>


          {/* Tables */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Seating Arrangement</h2>
            <ul className="space-y-2">
              {tables.map((table) => (
                <li
                  key={table._id}
                  className="border p-3 rounded flex justify-between"
                >
                  <span>
                    Table {table.tableNumber} - Capacity {table.capacity}
                  </span>
                  <span>
                    {table.available ? "✅ Available" : "❌ Not Available"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          {/* extraaa */}
              <div className="bg-white p-4 rounded-lg shadow-md mt-6">
               <h3 className="font-semibold text-gray-700">Today's Revenue</h3>
              <p className="text-2xl font-bold text-green-600">₹{dailyRevenue}</p>
            </div>
        </div>
        
      )}
    </div>
  );
};

export default Menu;