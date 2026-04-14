import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addCart: (state, action) => {
      const item = action.payload;
      if (item.type === "menu") {
        const existing = state.items.find((i) => i._id === item._id && i.type === "menu");
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({ ...item, quantity: 1 });
        }
      } else {
        // table
        state.items.push(item);
      }
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i._id === id && i.type === "menu");
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== id || i.type !== "menu");
        }
      }
    },
    reserveTableItem: (state, action) => {
      const table = action.payload;
       state.items.push(table);
      const exists = state.items.find((i) => i._id === table._id && i.type === "table");
      if (!exists) {
        state.items.push(table);
      }
    },
    clearCart:(state)=>{
      state.items=[];
    }
  }
});

export const { addCart, updateQuantity, reserveTableItem, clearCart } = cartSlice.actions;
// Selector for cart count
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => {
    if (item.type === "menu") return total + item.quantity;
    return total; // each table counts as 1
  }, 0);





export default cartSlice.reducer;