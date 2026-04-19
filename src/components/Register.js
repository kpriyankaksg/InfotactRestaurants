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
  const [errors, setErrors] = useState({});


  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name || name.length < 2) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10,15}$/.test(phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10–15 digits";

    if (!role) newErrors.role = "Role is required";
    if (role === "Partner" && !restaurantName)
      newErrors.restaurantName = "Restaurant name is required for partners";

    if (!addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!country) newErrors.country = "Country is required";
    if (!postalCode) newErrors.postalCode = "Postal Code is required";
    else if (!/^\d{4,10}$/.test(postalCode))
      newErrors.postalCode = "Postal Code must be numeric";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name, email, password, phoneNumber, role, restaurantName,
        addressLine1, addressLine2, city, state, country, postalCode
      });
      alert("User Registered Successfully.");
      navigate('/');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Email already Exist.");
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
        
        className="relative z-10 flex flex-col px-10 py-4 w-full max-w-2xl mx-auto my-8 bg-white bg-opacity-95 rounded-xl shadow-2xl"  >
       
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
           <option value="Admin">Admin</option>
        </select>
        {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}

        {role === "Partner" && (
          <>
          <input
            className="p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
           {errors.restaurantName && <p className="text-red-600 text-sm">{errors.restaurantName}</p>}
           </>
        )}

        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
         {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
         {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
         {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Phone No" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
         {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber}</p>}
        <label className="font-semibold mb-1">Address</label>
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
         {errors.addressLine1 && <p className="text-red-600 text-sm">{errors.addressLine1}</p>}
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
         {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
         {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
        <input className="p-3 mb-4 border border-gray-300 rounded-lg" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
         {errors.country && <p className="text-red-600 text-sm">{errors.country}</p>}
        <input className="p-3 mb-6 border border-gray-300 rounded-lg" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
         {errors.postalCode && <p className="text-red-600 text-sm">{errors.postalCode}</p>}

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