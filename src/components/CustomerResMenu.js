import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerResMenu = () => {
  const { resId } = useParams();
  console.log(resId);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const menuRes = await axios.get(`http://localhost:5000/api/auth/getMenu/${resId}`);
      setMenuItems(menuRes.data);

      const tableRes = await axios.get(`http://localhost:5000/api/auth/getTables/${resId}`);
      setTables(tableRes.data);
    };
    fetchData();
  }, [resId]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
     <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Restaurant Details</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
        <ul >
          {menuItems.map((item) => (
          
            <li key={item._id} className="border p-2 rounded flex justify-between">
             <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-xl"
                alt={item.itemName}
                src={item.image}
              />
                  <span className="text-sm font-medium">
                    {/* ({item.category}) */}
                    {item.itemName} - ₹{item.price} Rs 
                  </span>
                </div>

              <button
                onClick={() => addToCart(item)}
                className="bg-red-600 text-white px-3 rounded cursor-pointer"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Seating Arrangement</h2>
        <ul className="space-y-2">
          {tables.map((table) => (
            <li key={table._id} className="border p-3 rounded flex justify-between">
              <span>Table {table.tableNumber} - Capacity {table.capacity}</span>
              <span>{table.available ? "✅ Available" : "❌ Not Available"}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        <ul className="space-y-2">
          {cart.map((item, idx) => (
            <li key={idx} className="border p-3 rounded">
              {item.itemName} - ₹{item.price}
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">
            Proceed to Payment
          </button>
        )}
      </section>
    </div>
  );
};

export default CustomerResMenu;