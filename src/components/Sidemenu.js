import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../utils/userSlice";

const Sidemenu=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
const isMenuOpen= useSelector((appStore)=>appStore.menu.isMenuOpen);
if(!isMenuOpen) return null;

const handleLogout=()=>{
  alert("You have successfully logged out.")
   dispatch(clearUser());
   localStorage.removeItem("token");
   navigate("/");

}
  return(
    <div className="p-5 shadow-lg w-56 h-screen">
      <ul className="space-y-10">
        <li className="text-lg"><Link to="mainContainer">🏠 Home</Link></li>
        <li className="text-lg">📋 Orders</li>
        <li className="text-lg"><Link to="profile">👤 Profile</Link> </li>
        <li className="text-lg"><Link to="aboutUs">📱 About Us</Link></li>
        <li className="text-lg"><Link to="contactUs">☎️ Contact Us</Link></li>
        <li className="text-lg cursor-pointer" onClick={handleLogout}>🔒 Logout</li>
      </ul>
    </div>
  )
  
 
}
export default Sidemenu;
