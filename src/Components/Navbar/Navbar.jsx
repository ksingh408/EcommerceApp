
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineBars } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { setSearchTerm } from "../Redux/Slices/SearchSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;
  
  const [searchTerm, setLocalSearchTerm] = useState("");
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearchTerm(searchTerm)); 
      
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        
        {/* Menu Toggle */}
        <div className="position-relative" ref={menuRef}>
          <button
            className="btn bg-transparent border-0"
            onClickCapture={toggleMenu}
          >
            <AiOutlineBars size={50} className="text-white" />
          </button>

          {showMenu && (
            <div
              className="position-absolute bg-white shadow p-3"
              style={{
                top: "60px",
                left: "0",
                borderRadius: "10px",
                zIndex: "1000",
                width: "180px",
              }}
            >  
             <Link className="dropdown-item" to="/">Home</Link>
              <Link className="dropdown-item" to="/seller">Seller</Link>
              <Link className="dropdown-item" to="/admin">Admin</Link>
              <Link className="dropdown-item" to="/services">Service</Link>
              <Link className="dropdown-item" to="/dashboard">Dashboard</Link>

            </div>
          )}
        </div>


    
        <Link className="navbar-brand mx-3" to="/">
          <h1 className="text-white">OnlineStore</h1>
        </Link>

        <div className="d-flex flex-row mx-auto ms-3" style={{ width: "30%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-light mx-1">Search</button>
        </div>

        {/* Wishlist & Cart */}
        <Link to="/wishlist" className="btn position-relative mx-2">
          <FaHeart size={30} className="text-danger" />
          {wishlistCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="btn position-relative mx-2">
          <CiShoppingCart size={40} className="text-white opacity-70" />
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Auth Buttons */}
        {user ? (
          <button className="btn btn-outline-light mx-2" onClick={() => navigate("/")}>
            Logout
          </button>
        ) : (
          <Link className="btn btn-outline-light mx-2" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



