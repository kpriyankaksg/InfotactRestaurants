import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import restaurantSlice from "./restaurantSlice";
import userSlice from "./userSlice";

const appStore= configureStore({
  reducer:{
    menu:menuSlice,
    user:userSlice,
    restaurant:restaurantSlice
    
  }

})
export default appStore;