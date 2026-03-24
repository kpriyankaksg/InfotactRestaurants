import React, { useState } from "react";

const Profile=()=> {
  const [form, setForm] = useState({ name: "", email: "" });

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
    alert("Profile updated: " + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <button type="submit">Update Profile</button>
    </form>
  );
}
export default Profile;