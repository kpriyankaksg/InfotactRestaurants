import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register=()=>{
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [phoneNumber, setPhoneNumber]= useState("");
  const [role, setRole]= useState("");
  const [restaurantName, setRestaurantName]= useState("");
  const [addressLine1, setAddressLine1]= useState("");
  const [addressLine2, setAddressLine2]= useState("");
  const [city, setCity]= useState("");
  const [state, setState]= useState("");
  const [country, setCountry]= useState("");
  const [postalCode, setPostalCode]= useState("");

  const navigate= useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(name,email,password,phoneNumber,role,restaurantName,addressLine1,addressLine2,city,state,country,postalCode);
     try {
    const response = await axios.post("http://localhost:5000/api/auth/register", {
     name,email,password,phoneNumber,role,restaurantName,addressLine1,addressLine2,city,state,country,postalCode
    });
    console.log(response.data);
    alert("User Registered Successfully.");
    navigate('/');
    
  } catch (error) {
    console.error(error.response.data ); 
  }
  };

  return(
    <div>
     <form  className="flex flex-col  px-8 w-1/2 my-10 mx-auto right-0 left-0" >
      <h1 className=" text-3xl font-bold text-red-500">Sign Up</h1>
      <label className="p-2 font-bold">Role</label>
      <select className="border border-black p-2 m-2" value={role} onChange={(e)=> setRole(e.target.value)}>
        <option value="">Select</option>
        <option value="Customer">Customer</option>
        <option value="Partner">Partner</option>
      </select>
      {role === "Partner" && <input className="border border-black font-bold p-2 m-2" placeholder="Restaurant Name" value={restaurantName} onChange={(e)=> setRestaurantName(e.target.value)}>
      </input> }
      <input className="border border-black font-bold p-2 m-2" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="Email Id" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="Phone No" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}></input>
      <label className="p-2 font-bold">Address:</label>
      <input className="border border-black font-bold p-2 m-2" placeholder="Line1" value={addressLine1} onChange={(e)=> setAddressLine1(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="Line2" value={addressLine2} onChange={(e)=> setAddressLine2(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="City" value={city} onChange={(e)=> setCity(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="State" value={state} onChange={(e)=> setState(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="Country" value={country} onChange={(e)=> setCountry(e.target.value)}></input>
      <input className="border border-black font-bold p-2 m-2" placeholder="PostalCode" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}></input>
      <button className="border border-black font-bold p-2 m-2 rounded-sm bg-red-500 text-white" onClick={handleSubmit}>Submit</button>
     </form>
    </div>
  )

}
export default Register;