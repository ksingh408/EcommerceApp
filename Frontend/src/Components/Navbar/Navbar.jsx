
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Slices/authReducer";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineBars } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { setSearchTerm } from "../Redux/Slices/SearchSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  
  const user = useSelector((state) => state.auth.currentUser);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;
  
  const [searchTerm, setLocalSearchTerm] = useState("");
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async() => {
   await dispatch(logoutUser());
    navigate("/"); 
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setSearchTerm(searchTerm)); 
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container-fluid px-3">
      <div className="d-flex align-items-center w-100 justify-content-between">
        <div className="d-flex align-items-center" >
          {/* ref={menuRef} */}
          <button className="btn bg-transparent border-0" onClick={toggleMenu}>
            <AiOutlineBars size={50} className="text-white" />
          </button>

        </div>

        <Link className="navbar-brand ms-2" to="/">
              <h3 className="text-white mb-0">OnlineStore</h3>
            </Link>

  
        <div className="d-none d-md-flex mx-auto w-50" >
          <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-light ms-2">Search</button>
        </div>

        <div className="d-flex align-items-center">

        <Link to="/wishlist" className="btn position-relative mx-2">
          <FaHeart size={40} className="text-danger" />
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

        <Link className="btn btn-outline-light mx-2 d-none d-lg-block" to="/signin">
          Sign Up
          </Link>
      
        {user ? (
          <button className="btn btn-outline-light mx-2 d-none d-lg-block" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="btn btn-outline-light mx-2 d-none d-lg-block" to="/login">
            Login
          </Link>
        )}
      </div>  
      </div>
      {showMenu && (
          <div className="bg-white shadow p-3 mt-2 rounded ">
            <Link className="dropdown-item" to="/" onClick={() => setShowMenu(false)}>Home</Link>
            <Link className="dropdown-item" to="/admin" onClick={() => setShowMenu(false)}>Admin</Link>
            <Link className="dropdown-item" to="/seller" onClick={() => setShowMenu(false)}>Seller</Link>
            <Link className="dropdown-item" to="/dashboard" onClick={() => setShowMenu(false)}>Dashboard</Link>
            <div className="mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
              <button className="btn btn-dark w-100 mt-2">Search</button>
            </div>
            <div className="mt-3 d-lg-none">
      {user ? (
        <button className="btn btn-outline-dark w-100" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link className="btn btn-outline-dark w-100" to="/login" onClick={() => setShowMenu(false)}>
          Login
        </Link>
      )}
    </div>
          </div>
        )}
    </div>
    </nav>
  );
};

export default Navbar;
