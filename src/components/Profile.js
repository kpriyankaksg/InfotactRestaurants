import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile=()=> {
  const [form, setForm] = useState({ name: "", email: "", role: "", phoneNumber: "", restaurantName: "" });
  const userDetails= useSelector((appStore)=> appStore.user.user);
  console.log(userDetails);
  useEffect(()=>{
    if(userDetails){
      setForm({
       name: userDetails.user.name || "",
       email: userDetails.user.email || "",
       role: userDetails.user.role || "",
       phoneNumber: userDetails.user.phoneNumber || "",
       restaurantName: userDetails.user.restaurantName || "",
      
      })
    }
  },[userDetails])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
     await res.json();
    alert("Profile updated successfully.");
  };

  return (
    <div className="pt-24  flex justify-center bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <form
        className="flex flex-col px-1/2 py-10 w-full max-w-4xl bg-white rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Profile Details
        </h1>

        <input
          className="p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="p-4 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          disabled
          placeholder="Role"
          value={form.role}
        />
        <input
          className="p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />

        {userDetails?.user?.role === "Partner" && (
          <input
            className="p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Restaurant Name"
            value={form.restaurantName}
            onChange={(e) =>
              setForm({ ...form, restaurantName: e.target.value })
            }
          />
        )}

        <button
          className="p-4 mt-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;


