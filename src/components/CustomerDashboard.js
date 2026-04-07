import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      // Example: Hyderabad coordinates
      const lat = 17.385044;
      const lng = 78.486671;
       const response = await axios.get("http://localhost:5000/api/discover", {
        params: { lat, lng, page: 1, limit: 10 }
      });
      setRestaurants(response.data);
      console.log("all restaurants", response.data);
    };
    fetchRestaurants();
    // Serch 
     if (searchQuery.trim() === "") {
    setFilteredRestaurants(restaurants);
  } else if (searchQuery.toLowerCase() === "near me") {
    // Example: filter by distance < 5km
    setFilteredRestaurants(restaurants.filter(res => res.distance < 5000));
  } else {
    setFilteredRestaurants(
      restaurants.filter(res =>
        res.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }

  }, [searchQuery, restaurants]);

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Restaurants</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search restaurants by name or type 'near me'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
         <ul className="space-y-4">
            {filteredRestaurants.map((res) => (
              <li
                  key={res._id}
                  className="flex border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition"
                >
                  {/* Image */}
                  <img
                  src="https://png.pngtree.com/png-vector/20250916/ourmid/pngtree-food-restaurant-logo-vector-modern-cafe-dining-fast-grill-organic-bakery-png-image_17471779.webp"
                   
                    alt={res.name}
                    className="w-32 h-32 object-cover"
                  />
                {/* Details */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-red-600">{res.name}</h2>
                    <p className="text-gray-700">{res.address}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Distance: {(res.distance / 1000).toFixed(2)} km | Rating: ⭐ {res.rating}
                    </p>
                  </div>
                  <Link
                    to={`/body/restaurant/${res._id}`}
                    className="text-sm text-white bg-red-600 px-3 py-1 rounded mt-2 w-fit hover:bg-red-700"
                  >
                    View Menu & Tables
                  </Link>
                </div>
              </li>

            ))}
          </ul>


      {/* <ul className="space-y-4">
        {restaurants.map((res) => (
          <li key={res._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{res.name}</h2>
            <p>{res.address}</p>
              <p className="text-sm text-gray-600">
              Distance: {(res.distance / 1000).toFixed(2)} km | Rating: {res.rating}
            </p>
            <Link to={`/body/restaurant/${res._id}`} className="text-red-600 underline">
              View Menu & Tables
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CustomerDashboard;