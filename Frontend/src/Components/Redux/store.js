import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authReducer";
import cartReducer from "./Slices/addtoCart";
import wishlistReducer from "./Slices/wishlistSlice";
import searchReducer from "./Slices/SearchSlice"; 
import sellerReducer from "./Slices/sellerReduser";
import AdminPanel from "./Slices/AdminReduser.jsx";
import productReducer from "./Slices/productSlice";
//import userReducer from "./Slices/userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    search: searchReducer, 
    seller:sellerReducer,
    admin: AdminPanel,
    products: productReducer,
  },
});

export default store;

