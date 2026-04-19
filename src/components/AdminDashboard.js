import axios from "axios";
import { useEffect, useState } from "react";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lat = 17.385044;
      const lng = 78.486671;
       const response = await axios.get("http://localhost:5000/api/discover", {
        params: { lat, lng, page: 1, limit: 10 }
      });
      setRestaurants(response.data);
      console.log("all restaurants", response.data);
        // const restaurantsRes = await axios.get("http://localhost:5000/api/admin/restaurants");
        // setUsers(usersRes.data);
        // (restaurantsRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Admin Dashboard</h1>

      {/* Users Table */}
      {/* <h2 className="text-xl font-semibold mb-2">All Users</h2>
      <table className="w-full mb-6 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* Restaurants Table */}
      <h2 className="text-xl font-semibold mb-2">All Restaurants</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Postal Code</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.address}</td>
              <td className="border p-2">{r.postalCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;