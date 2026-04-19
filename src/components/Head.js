
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCartCount } from "../utils/cartSlice";
import { toggleMenu } from "../utils/menuSlice";


const Head=()=>{
  const dispatch= useDispatch();
   const navigate= useNavigate();
   const userDetails= useSelector((appStore)=> appStore.user.user);
   const registeredUserName= userDetails.user.name;
   const cartCount= useSelector(selectCartCount);

  const handleProfileClick=()=>{
    navigate("profile");
  }
  const handleMenuClick=()=>{
    dispatch(toggleMenu());
  }


  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg z-50">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <img
          alt="logo"
          className="w-10 h-10 cursor-pointer rounded-full border-2 border-white"
          onClick={handleMenuClick}
          src="https://as1.ftcdn.net/jpg/02/24/13/60/1000_F_224136032_b11na6zJLTpORSjfauRdpKamQDc7Uejv.jpg"
        />
       {/* <button
        className="md:hidden p-2 text-red-600"
        onClick={() => dispatch(toggleMenu())}
         >
         ☰
        </button> */}

        {userDetails?.user?.role === "Partner" ? (
          <h1 className="text-white font-extrabold text-xl drop-shadow-md">
            {userDetails.user.restaurantName}
          </h1>
        ) : (
          <h1 className="text-white font-extrabold text-2xl drop-shadow-md">
           🍴 FoodHub
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-10 text-white font-semibold">
          <li>
            <Link to="mainContainer" className="hover:text-yellow-200 transition">Home</Link>
          </li>

           {userDetails?.user?.role === "Partner" && (
         <li>
            <Link to="menu" className="hover:text-yellow-200 transition">Menu</Link>
          </li>
        )
       }  
        {userDetails?.user?.role === "Customer" && (
          <li>
            <Link to="/body/myOrders" className="hover:text-yellow-200 transition">My Orders</Link>
          </li>
        )
       }  
        
      
         {/* {userDetails?.user?.role === "Partner" ? (
         <li>
            <Link to="menu" className="hover:text-yellow-200 transition">Menu</Link>
          </li>
        ) : (
         <li>
            <Link to="/body/myOrders" className="hover:text-yellow-200 transition">My Orders</Link>
          </li>
        )} */}

          <li>
            <Link to="contactUs" className="hover:text-yellow-200 transition">Contact Us</Link>
          </li>
           {(userDetails?.user?.role === "Customer") && (
            <li className="flex jestify-between cursor-pointer"><Link to="cart">
              <div className="flex item-center">
              <img alt="cartLogo" className="w-8 h-8  " 
              src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png"/>
              {cartCount >0 &&
              <span className="font-2xl text-black px-1 ">{cartCount}</span>}
              </div>
            </Link>
            </li>
          )}

          <li className="flex items-center cursor-pointer" onClick={handleProfileClick}>
            <img
              alt="profileimg"
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            />
            <span className="ml-2 font-bold text-lg text-white">{registeredUserName}</span>
          </li>
      
        </ul>
      </nav>
    </header>
  );
};

export default Head;