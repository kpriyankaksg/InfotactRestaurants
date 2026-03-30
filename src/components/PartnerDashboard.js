import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
//import { useSelector } from "react-redux";

const PartnerDashboard = () => {
   
  const Current_res_details= useSelector((appStore)=> appStore.restaurant.restaurant);
  const selectedRestaurantId= Current_res_details.currentRestaurant.currentResId
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    category: "",
    itemName: "",
    price: "",
    image: "",
     available: true
  });

  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({
    tableNumber: "",
    capacity: "",
    available: true,
  });
  

  const handleAddItem = async (e) => {
    e.preventDefault();
    console.log("selectedRestaurantId.."+selectedRestaurantId);
    if(!selectedRestaurantId) return null;
    setMenuItems([...menuItems, newItem]);
   
     try {
          const response = await axios.post("http://localhost:5000/api/auth/addMenu", {
            restaurantId: selectedRestaurantId, // must come from your restaurant object
            category: newItem.category,
            itemName: newItem.itemName,
            price: newItem.price,
            image: newItem.image,
            available: newItem.available,
            
          });
          alert(response.data);
           setNewItem({category: "", itemName: "", price: "",  image: "",available: ""});
          // navigate('/');
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
  };

  const handleAddTable =async (e) => {
    e.preventDefault();
    if(!selectedRestaurantId) return null;
    setTables([...tables, newTable]);
  try{
      const result= await axios.post("http://localhost:5000/api/auth/table",{
       restaurantId: selectedRestaurantId,
       tableNumber: newTable.tableNumber,
       capacity: newTable.capacity,
       available: newTable.available
     });
      alert(result.data);
       setNewTable({ tableNumber: "", capacity: "", available: true });
      }catch(error){
            console.error(error.result?.data || error.message);
      }
  };

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Partner Dashboard</h1>

      {/* Menu Management */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
        <form onSubmit={handleAddItem} className="space-y-4">
           <input
            className="w-full p-3 border rounded"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded"
            placeholder="Item Name"
            value={newItem.itemName}
            onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded"
            placeholder="Image URL"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newItem.available}
              onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
            />
            <span>Available</span>
          </label>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Add Item</button>
        </form>

        {/* Display Items */}
        <ul className="mt-6 space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx} className="border p-3 rounded flex justify-between">
              <span>{item.name} - ₹{item.price} ({item.category})</span>
              <span>{item.available ? "✅ Available" : "❌ Not Available"}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Seating Arrangement */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Seating Arrangement</h2>
        <form onSubmit={handleAddTable} className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            placeholder="Table Number"
            value={newTable.tableNumber}
            onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded"
            placeholder="Capacity"
            value={newTable.capacity}
            onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newTable.available}
              onChange={(e) => setNewTable({ ...newTable, available: e.target.checked })}
            />
            <span>Available</span>
          </label>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Add Table</button>
        </form>

        {/* Display Tables */}
        <ul className="mt-6 space-y-2">
          {tables.map((table, idx) => (
            <li key={idx} className="border p-3 rounded flex justify-between">
              <span>Table {table.tableNumber} - Capacity {table.capacity}</span>
              <span>{table.available ? "✅ Available" : "❌ Not Available"}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PartnerDashboard;