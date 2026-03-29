import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackGround_IMG_URL } from "../utils/constants";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name, email, password, phoneNumber, role, restaurantName,
        addressLine1, addressLine2, city, state, country, postalCode
      });
      alert("User Registered Successfully.");
      navigate('/');
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="relative h-full min-h-screen w-screen">
      {/* Background */}
      <img
        className="absolute h-full w-full object-cover"
        src={BackGround_IMG_URL}
        alt="Restaurant Background"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Form */}
      <form
        
        className="relative z-10 flex flex-col px-10 py-4 w-full max-w-2xl mx-auto my-8 bg-white bg-opacity-95 rounded-xl shadow-2xl"
      >
        {/* relative z-10 flex flex-col px-6 py-4 w-full max-w-md mx-auto my-8 bg-white bg-opacity-95 rounded-xl shadow-2xl */}
        <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">Sign Up</h1>

        <label className="font-semibold mb-1">Role</label>
        <select
          className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Customer">Customer</option>
          <option value="Partner">Partner</option>
        </select>

        {role === "Partner" && (
          <input
            className="p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        )}

        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Phone No" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <label className="font-semibold mb-1">Address</label>
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
        <input className="p-3 mb-6 border border-gray-300 rounded-lg" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />

        <button
          type="submit"
          className="p-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;