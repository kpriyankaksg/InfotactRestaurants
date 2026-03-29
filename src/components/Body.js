import { Outlet } from "react-router-dom";
import Head from "./Head";
import Sidemenu from "./Sidemenu";
const Body=()=>{
  return(
    <div className="flex flex-col min-h-screen">
    <Head />
    <div className="flex flex-1">
      {/* Sidebar */}
      <Sidemenu />

      {/* Main content */}
      <div className="flex-1 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 p-8">
        <Outlet />
      </div>
    </div>
  </div>

  )
}
export default Body;