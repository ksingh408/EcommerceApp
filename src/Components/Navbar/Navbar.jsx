import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slices/authReducer";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineBars } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(loginUser(user));
    navigate("/");
  };

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const cartRef = useRef(null);
  const menuRef = useRef(null);

  
  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        
      
        <div className="position-relative" ref={menuRef}>
          <button 
            className="p-2 rounded-md bg-transparent border-0 focus:outline-none hover:bg-gray-800 transition duration-200"
            onClick={toggleMenu}
          >
            <AiOutlineBars size={40} className="text-white opacity-70 hover:opacity-100 transition" />
          </button>

          {showMenu && (
            <div className="position-absolute d-flex flex-column bd-highlight mb-3 bg-white shadow-lg rounded-lg p-3 w-48 top-100 left-0 z-50 border border-gray-200">
              <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" to="/">
                Home
              </Link>
              <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" to="/dashboard">
                Admin
              </Link>
              <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" to="/seller">
                Seller
              </Link>
              <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" to="/dashboard">
                User
              </Link>
            </div>
          )}
        </div>

        {/* Brand */}
        <Link className="navbar-brand mx-3" to="/">
          <h1 className="text-white">OnlineStore</h1>
        </Link>

        {/* Search Bar */}
        <div className="d-flex flex-row mx-auto ms-3" style={{width:"30%"}}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-light mx-1">
            Search
          </button>
        </div>

        {/* Navigation & Auth Section */}
        <div className="d-flex align-items-center">
          
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="btn position-relative mx-2">
            <FaHeart size={30} className="text-danger" />
            {wishlistCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "14px", padding: "5px 10px" }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          
          <Link to="/cart" className="btn position-relative mx-2">
              <CiShoppingCart size={40} className="text-white opacity-70 hover:opacity-100 transition" />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "14px", padding: "5px 10px" }}>
                  {cartCount}
                </span>
              )}
            </Link>
            
          {/* Authentication Buttons */}
          {user ? (
            <button className="btn btn-outline-light mx-2" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-outline-light mx-2" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





