
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleMenu } from "../utils/menuSlice";


const Head=()=>{
  const dispatch= useDispatch();
   const navigate= useNavigate();
   const userDetails= useSelector((appStore)=> appStore.user.user);
   const registeredUserName= userDetails.user.name

  const handleProfileClick=()=>{
    navigate("profile");
  }
  const handleMenuClick=()=>{
    dispatch(toggleMenu());
  }




  return(
    <div id="root" className="flex p-4 m-2  bg-slate-100 shadow-lg">
      <div className="grid grid-cols-4 flex flex-row">
        <img alt="logo" className="w-8 h-10 cursor-pointer" onClick={handleMenuClick}
     src="https://as1.ftcdn.net/jpg/02/24/13/60/1000_F_224136032_b11na6zJLTpORSjfauRdpKamQDc7Uejv.jpg" />
     {userDetails?.user?.role === "Partner"? (<h1 className="text-red-600 font-bold text-xl">{userDetails.user.restaurantName}</h1>):(
      <h1 className="text-red-600 font-bold text-2xl">The Food Hub</h1>
     ) }
      </div>

      <div className="grid-cols-8 flex justify-end ">
        <ul className="flex space-x-10  px-60">
         <li>
             <Link to="mainContainer" className="font-bold text-md cursor-pointer">Home</Link>
          </li>
          <li>
             <Link to="aboutUs" className="font-bold text-md cursor-pointer">About Us</Link>
          </li>
          <li>
             <Link to="contactUs" className="font-bold text-md cursor-pointer">Contact Us</Link>
          </li>
         
            <li className="flex w-8 h-8 cursor-pointer align-right" onClick={handleProfileClick}>
               <img alt="profileimg" src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" />
              <label className="px-2 font-bold text-lg text-red-500">{registeredUserName}</label>
             
            </li>
         
        </ul>
      </div>
     
    </div>
  )
}
export default Head;