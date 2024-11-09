import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cartSlice/cartSlice";
import userReducer from "../userSlice/userSlice";

// Configure the Redux store
export const store = configureStore({
  // Define the reducers for different slices of the application state
  reducer: {
    // Reducer for managing the cart state
    reducer: cartReducer,
    // Reducer for managing the user state
    user: userReducer,
  },
});

// Export the Redux store for use in other parts of the application
export default store;
