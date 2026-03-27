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
    const data = await res.json();
    alert("Profile updated successfully.");
  };

  return (
    <form className="flex flex-col  px-10 w-4/12 my-10 " onSubmit={handleSubmit}>
      <input className="border border-black font-bold p-2 m-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="border border-black font-bold p-2 m-2"  placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="border border-black font-bold p-2 m-2" disabled={true}  placeholder="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      <input className="border border-black font-bold p-2 m-2"  placeholder="phoneNumber" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />

     {(userDetails?.user?.role === "Partner") && <input className="border border-black font-bold p-2 m-2"  placeholder="restaurantName" value={form.restaurantName} onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} /> }



      
      <button className="border border-black font-bold p-2 m-2 rounded-sm bg-red-500 text-white" type="submit">Update Profile</button>
    </form>
  );
}
export default Profile;