import { configureStore } from "@reduxjs/toolkit";
import menuItemsSlice from "./menuItemsSlice";
import menuSlice from "./menuSlice";
import restaurantSlice from "./restaurantSlice";
import tableSlice from "./tableSlice";
import userSlice from "./userSlice";

const appStore= configureStore({
  reducer:{
    menu:menuSlice,
    user:userSlice,
    restaurant:restaurantSlice,
    menuItems:menuItemsSlice,
    table:tableSlice
    
  }

})
export default appStore;