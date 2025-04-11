// src/App.js
import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx'; // Import Navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from"./Components/Navbar/footer.jsx";
import Login from './Components/Product/LoginPage.jsx';
import Signup from './Components/Product/SignupPage.jsx';
import Home from './Components/Product/Home.jsx';
import SiteUser from "./Components/Product/usersProduct.jsx"
import Cart from "./Components/Product/CartPage.jsx"
import Wishlist from './Components/Product/Wishlist.jsx';
import Seller from './Components/Product/sellerAction.jsx'
import Admin from './Components/Product/AdminUser.jsx'
import Checkout from './Components/Product/checkOut.jsx';
import OrderSuccess from './Components/Product/orderSucess.jsx';
const App = () => {

    
  return (
    <Router>
      <Navbar /> 
       <div>
        <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
           <Route path="/about" element={<h2>About Page</h2>} /> 
          <Route path="/user" element={<SiteUser/>} />
          <Route path="/contact" element={<h2>Contact Page</h2>} />
          <Route path="/signin" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<h2>About Page</h2>} /> 
           <Route path="/seller" element={<Seller/>} /> 
           <Route path="/admin" element={<Admin/>} /> 
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/order-success" element={<OrderSuccess />} />
        </Routes> 
       </div>
       <Footer/> 
      
      
    </Router>
 
  );
};

export default App;




