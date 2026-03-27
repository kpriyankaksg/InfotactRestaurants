import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import userSlice from "./userSlice";

const appStore= configureStore({
  reducer:{
    menu:menuSlice,
    user:userSlice
  }

})
export default appStore;