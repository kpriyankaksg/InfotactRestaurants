import { useSelector } from "react-redux";
import CustomerDashboard from "./CustomerDashboard";
import PartnerDashboard from "./PartnerDashboard";
import AdminDashboard from "./AdminDashboard";

const MainContainer=()=>{

  const userDetails= useSelector((appStore)=> appStore.user.user);

  return(
    <div>
      {(userDetails.user.role === "Partner") &&  <PartnerDashboard />}
       {(userDetails.user.role === "Customer") &&  <CustomerDashboard />}
       {(userDetails.user.role === "Admin") &&  <AdminDashboard />}
   
    </div>

  )
}
export default MainContainer;