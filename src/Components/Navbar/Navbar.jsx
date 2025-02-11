import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineBars } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartRef = useRef(null);
  const menuRef = useRef(null);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Menu Bar with Dropdown */}
        <div className="position-relative" ref={menuRef}>
          <button
            className="btn bg-transparent border-0"
            onClick={toggleMenu}
          >
            <AiOutlineBars size={50} className="text-white-50" />
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
              <Link className="dropdown-item" to="/seller">Seller</Link>
              <Link className="dropdown-item" to="/admin">Admin</Link>
              <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
            </div>
          )}
        </div>

        <Link className="navbar-brand" to="/">
          <h1>OnlineStore</h1>
        </Link>

        {/* Search Bar */}
       

        <div className="collapse navbar-collapse ms-auto" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/men">Men</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/women">Women</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
          </ul>
 <form className="d-flex mx-auto" style={{ width: "30%" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
          <div className="d-flex align-items-center ms-auto">
            <li className="nav-item">
              <Link className="btn btn-outline-light mx-1" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-light mx-1" to="/signin">Sign in</Link>
            </li>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="btn position-relative mx-2">
              <FaHeart size={30} className="text-danger" />
              {wishlistCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "14px", padding: "5px 10px" }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon with Dropdown */}
            <div className="position-relative" ref={cartRef}>
              <button
                className="btn position-relative bg-transparent border-0"
                onClick={toggleCart}
              >
                <CiShoppingCart size={50} className="text-white-50" />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "14px", padding: "5px 10px" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {showCart && (
                <div
                  className="position-absolute bg-white shadow p-3"
                  style={{
                    width: "250px",
                    top: "60px",
                    right: "0",
                    borderRadius: "10px",
                    zIndex: "1000",
                  }}
                >
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "10px",
                            borderRadius: "5px",
                          }}
                        />
                        <span>{item.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No items in cart</p>
                  )}

                  <hr />
                  <Link to="/cart" className="btn btn-primary w-100">
                    View Cart
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


