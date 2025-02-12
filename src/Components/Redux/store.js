import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/addtoCart.jsx';
import wishlistReducer from './Slices/wishlistSlice.jsx';
import authReducer from "./Slices/authReducer.jsx";
import sellerReducer from "./Slices/sellerReduser.jsx"
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    seller: sellerReducer,
  },
});

export default store;
