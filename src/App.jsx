// src/App.js
import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'; // Import Navbar
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from"./Components/Navbar/footer";
import Login from './Components/Product/LoginPage.jsx';
import Signup from './Components/SignupPage';
import Home from './Components/Product/Home';
import SiteUser from "./Components/Product/usersProduct"
import Cart from "./Components/Product/CartPage.jsx"
import Wishlist from './Components/Product/Wishlist.jsx';
import Seller from './Components/seller/sellerPage.jsx'
const App = () => {

    
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */} 
       <div>
        <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
           {/* <Route path="/men" element={<h2>Men</h2>} /> 
           <Route path="/women" element={<h2>Women</h2>} /> */}
           <Route path="/about" element={<h2>About Page</h2>} /> 
          <Route path="/services" element={<SiteUser/>} />
          <Route path="/contact" element={<h2>Contact Page</h2>} />
          <Route path="/signin" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<h2>About Page</h2>} /> 
          {/* <Route path="/seller" element={<Seller/>} />  */}
        </Routes> 
       </div>
       <Footer/> 
      
      
    </Router>
 
  );
};

export default App;




