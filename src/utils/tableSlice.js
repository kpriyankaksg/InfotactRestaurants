import { createSlice } from "@reduxjs/toolkit";

const tableSlice= createSlice({
  name:"table",
  initialState:{
    table: []
  },
  reducers:{
     setTable:(state, action)=>{
      state.table= action.payload
    },
    addTable: (state, action) => {
      state.table.push(action.payload); // append single item
    }
   
  }

})

export const {setTable,addTable}= tableSlice.actions;
export default tableSlice.reducer;