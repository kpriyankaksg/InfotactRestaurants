import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactUs=()=>{
  const[latLong, setLatLong]=useState(null);
  const dispatch= useDispatch();

  const userDetails= useSelector((appStore)=> appStore.user.user);
 const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    postalCode: "",
    lat: "",
    lon: "",
  });

  const getLatLong = async () => {
   // const apiKey = geocodingAPIKey; // replace with your key
    const fullAddress = `${restaurant.address} ${restaurant.postalCode}`;
    console.log(fullAddress);
   const apiKey = "pk.9261116a0029435ee02344c13652b66c"; // from signup
  const response = await fetch(
    `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(fullAddress)}&format=json`
  );
  const latlongresult = await response.json();

  if (latlongresult.length > 0) {
    const { lat, lon } = latlongresult[0];
    console.log("Latitude:", lat, "Longitude:", lon);
    setLatLong({lat, lon});
    return { lat, lon };
  } else {
    throw new Error("No results found");
  }
}


  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Restaurant details",userDetails.user.restaurantName, restaurant, latLong.lat, latLong.lon);
    try{
    const result= await axios.post("http://localhost:5000/api/auth/restaurants",{
                  name: userDetails.user.restaurantName,
                  address: restaurant.address,
                  postalCode: restaurant.postalCode,
                  lat: latLong.lat,
                  lon: latLong.lon,

    });
     console.log("Saved Restaurant:", result);
     const RestaurantDetails = result.data;
           dispatch(setRestaurant(RestaurantDetails));
           console.log(RestaurantDetails);
     alert("Restaurant Details Inserted Successfully.");


  }
  catch(err){
    console.error("Error saving restaurant:", err);
  }
    
  };


  return(
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8">Restaurant Details</h1>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow">
      <input
        className="w-full p-3 border rounded"
        placeholder="Restaurant Name"
        value={userDetails.user.restaurantName}
        onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
      />
      <input
        className="w-full p-3 border rounded"
        placeholder="Address"
        value={restaurant.address}
        onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
      />
      <input
        className="w-full p-3 border rounded"
        placeholder="Postal Code"
        value={restaurant.postalCode}
        onChange={(e) => setRestaurant({ ...restaurant, postalCode: e.target.value })}
      />
      
      {latLong && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Latitude:</strong> {latLong.lat}</p>
          <p><strong>Longitude:</strong> {latLong.lon}</p>
        </div>
      )}
        

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



    </div>
  );
};


export default ContactUs;