import { useSelector } from "react-redux";
import CustomerDashboard from "./CustomerDashboard";
import PartnerDashboard from "./PartnerDashboard";

const MainContainer=()=>{

  const userDetails= useSelector((appStore)=> appStore.user.user);

  return(
    <div>
      {(userDetails.user.role === "Partner") &&  <PartnerDashboard />}
        {(userDetails.user.role === "Customer") &&  <CustomerDashboard />}
   
    </div>

  )
}
export default MainContainer;