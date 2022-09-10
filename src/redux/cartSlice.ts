import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Items {
  name: string;
  price: number;
  quantity: number;
}

const initalState: Items[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState: initalState,
  reducers: {
    addToCart: (state, action: PayloadAction<Items>) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<Items>) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        state.splice(state.indexOf(item), 1);
      }
    },
    clearCart: (state) => {
      state.splice(0);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
