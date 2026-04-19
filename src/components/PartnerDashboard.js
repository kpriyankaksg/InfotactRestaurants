import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Latlong_ApiKey } from "../utils/constants";
import { addMenuItem } from "../utils/menuItemsSlice";
import { setRestaurant } from "../utils/restaurantSlice";
import { addTable } from "../utils/tableSlice";
import { setUser } from "../utils/userSlice";


const PartnerDashboard = () => {
  const[latLong, setLatLong]=useState(null);
   const [menuItemsAdd, setMenuItemsAdd] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId]=useState(null);
  const [errors, setErrors]= useState({});
  // const Current_res_details= useSelector((appStore)=> appStore.restaurant.restaurant);
  const userDetails= useSelector((appStore)=> appStore.user.user);
  const dispatch= useDispatch();
  // const navigate= useNavigate();

 const validateForm = () => {
  const newErrors = {};

  // if (!restaurants.name || restaurants.name.trim().length < 2)
  //   newErrors.name = "Restaurant Name is Required";

  if (!restaurants.address)
    newErrors.address = "Address is Required";

  if (!restaurants.postalCode)
    newErrors.postalCode = "Postal Code is Required";
  else if (!/^\d{4,10}$/.test(restaurants.postalCode))
    newErrors.postalCode = "Postal Code must be Numeric";

  if (!restaurants.lat || Math.abs(restaurants.lat) > 90)
  newErrors.lat = "Latitude must be between -90 and 90";

if (!restaurants.lon || Math.abs(restaurants.lon) > 180)
  newErrors.lon = "Longitude must be between -180 and 180";


  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  
  
 useEffect(() => {
    if (userDetails?.user?.id) {
      getRestaurantDetailsDB();
    } 
  }, [userDetails]);
  
   const [restaurants, setRestaurants] = useState({
      name: "",
      address: "",
      postalCode: "",
      lat: "",
      lon: "",
    });
  
  
  const getLatLong = async () => {
  const fullAddress = `${restaurants.address} ${restaurants.postalCode}`;
  const apiKey = Latlong_ApiKey;

  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(fullAddress)}&format=json`
    );
    const latlongresult = await response.json();

    if (latlongresult.length > 0) {
      const { lat, lon } = latlongresult[0];
      console.log("Latitude:", lat, "Longitude:", lon);

      // ✅ update both states
      setLatLong({ lat, lon });
      setRestaurants((prev) => ({
        ...prev,
        lat,
        lon,
      }));
    } else {
      throw new Error("No results found for this address");
    }
  } catch (err) {
    console.error("Error fetching coordinates:", err);
  }
};
  
  // add restaurant
    const handleSubmit =async (e) => {
      e.preventDefault();
    
      if(!validateForm()) return;
        console.log(restaurants.name, userDetails.user.restaurantName)
     console.log("Restaurant details",userDetails.user.id, userDetails.user.restaurantName, restaurants.address,restaurants.postalCode,   parseFloat(latLong.lat),  parseFloat(latLong.lon));
    //  location: { type: "Point", coordinates: [78.486671, 17.385044] }
      try{
      const result= await axios.post("http://localhost:5000/api/auth/restaurants",{
                    userId: userDetails.user.id,
                    name: userDetails.user.restaurantName,
                    address: restaurants.address,
                    postalCode: restaurants.postalCode,
                    lat: parseFloat(latLong.lat),
                    lon: parseFloat(latLong.lon)

                   
      });
      //  lat: latLong.lat,
      //               lon: latLong.lon,
       console.log("Saved Restaurant:", result);
       const RestaurantDetails = result.data;
             dispatch(setRestaurant(RestaurantDetails));
            // console.log(RestaurantDetails);
                // dispatch(setUser({
                //   ...userDetails.user,
                //   restaurantName: RestaurantDetails.name
                // }));

       alert("Restaurant Details Inserted Successfully.");
       getRestaurantDetailsDB();
    }
    catch(err){
      console.error("Error saving restaurant:", err);
    }
    };



// get restaurant details.......
   const getRestaurantDetailsDB = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/getRestaurant/${userDetails.user.id}`
      );
         console.log("restaurant db..", response.data);
      if (response.data && response.data._id) {
        console.log("response.data"+response.data);
        dispatch(setRestaurant(response.data));
        setSelectedRestaurantId(response.data._id);

      // ✅ Pre-fill form fields from DB
      setRestaurants({
        name: response.data.name || "",
        address: response.data.address || "",
        postalCode: response.data.postalCode || "",
        lat: response.data.lat || "",
        lon: response.data.lon || "",
      });

      // ✅ Pre-fill latLong state so coordinates show up
      if (response.data.lat && response.data.lon) {
        setLatLong({ lat: response.data.lat, lon: response.data.lon });
      }
    } else {
        // No restaurant found → navigate to Contact Us
        alert("Please provide your restaurant details first.");
        //navigate("contactUs"); // replace with your actual route
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      // alert("Error fetching restaurant details. Please try again.");
      //navigate("contactUs");
    }
  };


  
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
  
//add menu Item
  const handleAddItem = async (e) => {
    e.preventDefault();
    // console.log("selectedRestaurantId.."+selectedRestaurantId);
    if(!selectedRestaurantId) return null;
    setMenuItemsAdd([...menuItemsAdd, newItem]);
     try {
          const response = await axios.post("http://localhost:5000/api/auth/addMenu", {
            restaurantId: selectedRestaurantId, // must come from your restaurant object
            category: newItem.category,
            itemName: newItem.itemName,
            price: newItem.price,
            image: newItem.image,
            available: newItem.available,
            
          });
          alert("Item Inserted Successfully.");
            dispatch(addMenuItem(response.data));
           setNewItem({category: "", itemName: "", price: "",  image: "",available: ""});
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
  };
// Add table info
  const handleAddTable =async (e) => {
    e.preventDefault();
    console.log(selectedRestaurantId);
    if(!selectedRestaurantId) return null;
    setTables([...tables, newTable]);
  try{
      const result= await axios.post("http://localhost:5000/api/auth/table",{
       restaurantId: selectedRestaurantId,
       tableNumber: newTable.tableNumber,
       capacity: newTable.capacity,
       available: newTable.available
     });
     console.log(result.data);
      alert("Table Details Inserted Successfully.");
      const TableDetails= result.data;
      dispatch(addTable(TableDetails));
       setNewTable({ tableNumber: "", capacity: "", available: true });
      }catch(error){
            console.error(error.result?.data || error.message);
      }
  };

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Partner Dashboard</h1>
      
     <h2 className="text-xl font-semibold mb-4">Resturant Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow">
      <input
        className="w-full p-3 border rounded"
        placeholder="Restaurant Name"
        value={userDetails.user.restaurantName} disabled
        onChange={(e) => setRestaurants({ ...restaurants, name: e.target.value })}
      />
      {/* {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>} */}

      <input
        className="w-full p-3 border rounded"
        placeholder="Address"
        value={restaurants.address}
        onChange={(e) => setRestaurants({ ...restaurants, address: e.target.value })}
      />
       {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
      <input
        className="w-full p-3 border rounded"
        placeholder="Postal Code"
        value={restaurants.postalCode}
        onChange={(e) => setRestaurants({ ...restaurants, postalCode: e.target.value })}
      /> 
       {errors.postalCode && <p className="text-red-600 text-sm">{errors.postalCode}</p>}
      {latLong && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Latitude:</strong> {latLong.lat}</p>
          <p><strong>Longitude:</strong> {latLong.lon}</p>
        </div>
      )}
        {errors.lat && <p className="text-red-600 text-sm">{errors.lat}</p>}
         {errors.lon && <p className="text-red-600 text-sm">{errors.lon}</p>}
        
       <button
        type="button"
        onClick={getLatLong}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Get Coordinates
      </button>

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Save Restaurant
      </button>
    </form>


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
          {menuItemsAdd.map((item, idx) => (
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