import { createSlice } from "@reduxjs/toolkit";

const menuItemsSlice=createSlice({
  name:"menuItems",
  initialState:{
    menuItems:[]
  },
  reducers:{
    setMenuItems:(state,action)=>{
      state.menuItems= action.payload
    },
    addMenuItem: (state, action) => {
      state.menuItems.push(action.payload); // append single item
    }

  }
});

export const{setMenuItems,addMenuItem}= menuItemsSlice.actions;
export default menuItemsSlice.reducer;