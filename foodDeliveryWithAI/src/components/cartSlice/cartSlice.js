import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for adding to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ name, price, userLoggedIn }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "import.meta.env.VITE_URL/API/aiFoodDelivery/cart/addToCart",
        {
          email: userLoggedIn,
          name: name,
          price: price,
        }
      );
      return {
        name,
        price,
        quantity: 1,
        totalPrice: price,
        response: response.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for removing from cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async ({ name, userLoggedIn }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "import.meta.env.VITE_URL/API/aiFoodDelivery/cart/removeFromCart",
        {
          email: userLoggedIn,
          name: name,
        }
      );
      return { name, response: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    numberOfElements: 0,
    totalPrice: 0,
  },
  reducers: {
    clearCart(state) {
      state.itemsList = [];
      state.numberOfElements = 0;
      state.totalPrice = 0;
    },
    pushToRedux(state, action) {
      // console.log("action::", action.payload);
      state.itemsList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.itemsList.find(
          (item) => item.name === newItem.name
        );
        if (existingItem) {
          existingItem.quantity++;
          existingItem.totalPrice += newItem.price;
        } else {
          state.itemsList.push(newItem);
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        // console.error("Failed to add item to cart:", action.payload);
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const { name } = action.payload;
        const itemIndex = state.itemsList.findIndex(
          (item) => item.name === name
        );
        if (itemIndex !== -1) {
          const item = state.itemsList[itemIndex];
          if (item.quantity === 1) {
            state.itemsList.splice(itemIndex, 1);
          } else {
            item.quantity--;
            item.totalPrice -= item.price;
          }
        }
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        // console.error("Failed to remove item from cart:", action.payload);
      });
  },
});

export const { clearCart, removeFromCart, addToCart, pushToRedux } =
  cartSlice.actions;
export default cartSlice.reducer;
