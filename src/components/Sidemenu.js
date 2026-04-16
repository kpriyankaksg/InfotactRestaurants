import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../utils/userSlice";

const Sidemenu=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userDetails= useSelector((appStore)=> appStore.user.user);
const isMenuOpen= useSelector((appStore)=>appStore.menu.isMenuOpen);
if(!isMenuOpen) return null;

const handleLogout=()=>{
  alert("You have successfully logged out.")
   dispatch(clearUser());
   localStorage.removeItem("token");
   navigate("/");

}
 return (
    <aside
  className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-red-700 via-orange-600 to-yellow-500 text-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0`}>
  

      <div className="p-6 py-4 border-b border-white/30">
        <h2 className="text-2xl font-extrabold tracking-wide">🍴 FoodHub</h2>
      </div>
      <ul className="space-y-6 mt-6 font-semibold">
        <li>
          <Link
            to="mainContainer"
            className="flex items-center space-x-3 hover:bg-white/20 px-4 py-2 rounded-lg transition" >
            <span>🏠</span> <span>Home</span>
          </Link>
        </li>
         
       
         {userDetails?.user?.role === "Partner" ? (
          <>
          <li>
           <Link
            to="menu"
            className="flex items-center space-x-3 hover:bg-white/20 px-4 py-2 rounded-lg transition" >
            <span>📱</span> <span>Menu</span>
          </Link>
          </li>

           <li>
           <Link
            to="recentOrders"
            className="flex items-center space-x-3 hover:bg-white/20 px-4 py-2 rounded-lg transition" >
            <span>📋</span> <span>Recent Orders</span>
          </Link>
          </li>
          </>
          
        ) : (
           <li>
          <Link to="myOrders" className="flex items-center space-x-3 hover:bg-white/20 px-4 py-2 rounded-lg transition">
          <span>📋</span> <span>My Orders</span>
          </Link>
          </li>
        )}
      

        <li>
        <Link
            to="contactUs"
            className="flex items-center space-x-3 hover:bg-white/20 px-4 py-2 rounded-lg transition" >
            <span>☎️ </span> <span>Contact Us</span>
          </Link>
        </li>

         <li>
          <Link
            to="profile"
            className="flex items-center space-x-3 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            <span>👤</span> <span>Profile</span>
          </Link>
        </li>
       
        <li
          className="flex items-center space-x-3 hover:bg-white/20 px-4 py-2 rounded-lg transition cursor-pointer"
          onClick={handleLogout}
        >
          <span>🔒</span> <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
};


export default Sidemenu;
