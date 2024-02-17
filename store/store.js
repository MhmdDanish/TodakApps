import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userSlice';
import cartReducer from "./reducer/cartReducer";
import addressReducer from "./reducer/addressReducer";
import orderReducer from "./reducer/orderReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    addresses: addressReducer,
    order: orderReducer,
  },
});

export default store;
