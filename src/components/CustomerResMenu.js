import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addCart, reserveTableItem, updateQuantity } from "../utils/cartSlice"; // <-- your cartSlice actions

const CustomerResMenu = () => {
  const { resId } = useParams();
  const location=useLocation();
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationDate, setReservationDate]=useState([]);
  const [reservationTime, setReservationTime] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // cartSlice state

  const selectedResName= location.state?.resName;
  const selectedResPostalCode= location.state?.postalCode;
  console.log(selectedResName, selectedResPostalCode);

  useEffect(() => {
    const fetchData = async () => {
      const menuRes = await axios.get(`http://localhost:5000/api/auth/getMenu/${resId}`);
      setMenuItems(menuRes.data);
      console.log("menuItems", menuRes.data);

      const tableRes = await axios.get(`http://localhost:5000/api/auth/getTables/${resId}`);
      setTables(tableRes.data);
    };
    fetchData();
  }, [resId]);

  // Add menu item to cart
  const addToCart = (item) => {
    dispatch(addCart({ ...item, type: "menu", selectedResName,selectedResPostalCode}));
  };

  // Update quantity (+ / -)
  const changeQuantity = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };

  // Reserve table
  const reserveTable = (table) => {
     const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);

    dispatch(reserveTableItem({ ...table, type: "table",reservationDateTime }));
    // mark table as booked locally so button changes
    setTables((prev) =>
      prev.map((t) =>
        t._id === table._id ? { ...t, available: false,reservationDateTime  } : t
      )
    );
  };

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Restaurant Details</h1>

      {/* Menu Items */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
        <ul>
          {menuItems.map((item) => {
            const cartItem = cart.find((c) => c._id === item._id && c.type === "menu");
            return (
              <li key={item._id} className={`border p-3 rounded flex justify-between items-center 
                                  ${!item.available ? "opacity-50 cursor-not-allowed" : ""}`} 
                                   title={!item.available ? "Currently not being served" : ""}
>
                <div className="flex items-center gap-4">
                  <img className="w-20 h-20 rounded-xl" alt={item.itemName} src={item.image} />
                  <span className="text-sm font-medium">
                    {item.itemName} - ₹{item.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {cartItem ? (
                    <>
                      <button
                        onClick={() => changeQuantity(item._id, -1)}
                        className="bg-gray-300 px-2 rounded"
                      >
                        –
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item._id, +1)}
                        className="bg-gray-300 px-2 rounded"
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Add
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Tables */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Seating Arrangement</h2>
        <label className="block mb-2">Reservation Date</label>
        <input
          type="date"
          value={reservationDate}
          onChange={(e) => setReservationDate(e.target.value)}
          className="border p-2 rounded"
        />
            <label className="block mb-2 mt-2">Reservation Time</label>
            <input
              type="time"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              className="border p-2 rounded"
            />

        <ul className="space-y-2">
          {tables.map((table) => (
            <li key={table._id} className="border p-3 rounded flex justify-between items-center">
              <span>Table {table.tableNumber} - Capacity {table.capacity}</span>
              {table.available ? (
                <button
                  onClick={() => reserveTable(table)}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                >
                  Reserve
                </button>
              ) : (
                <span className="text-red-600 font-semibold">Booked</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Cart */}
      {/* <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        <ul className="space-y-2">
          {cart.map((item, idx) => (
            <li key={idx} className="border p-3 rounded flex justify-between items-center">
              {item.type === "table" ? (
                <span>Reserved Table {item.tableNumber} (Capacity {item.capacity})</span>
              ) : (
                <span>
                  {item.itemName} - ₹{item.price} × {item.quantity}
                </span>
              )}
            </li>
          ))}
        </ul>

        {cart.length > 0 && (
          <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">
            Proceed to Payment
          </button>
        )}
      </section> */}
    </div>
  );
};

export default CustomerResMenu;