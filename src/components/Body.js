import { Outlet } from "react-router-dom";
import Head from "./Head";
import Sidemenu from "./Sidemenu";
const Body=()=>{
  return(
    <div className="flex flex-col">
     <Head />
     <div  style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
     <Sidemenu />
     <Outlet />
     </div>
    </div>
  )
}
export default Body;