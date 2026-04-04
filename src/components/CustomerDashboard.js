import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get("http://localhost:5000/api/auth/restaurants");
      setRestaurants(response.data);
      console.log("all restaurants", response.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Restaurants</h1>
      <ul className="space-y-4">
        {restaurants.map((res) => (
          <li key={res._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{res.name}</h2>
            <p>{res.address}</p>
            <Link to={`/body/restaurant/${res._id}`} className="text-red-600 underline">
              View Menu & Tables
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerDashboard;