import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromWishlist } from "../Redux/Slices/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist?.wishlistItems || []);
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState("default");


  const sortedWishlist = [...wishlist].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

 
  const totalWishlistPrice = wishlist.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-5 d-flex flex-column align-items-center" style={{ width: "80%" }}>
      <h2 className="text-center mt-5 mb-4">💖 Your Wishlist</h2>

      {/* Filter Dropdown */}
      {wishlist.length > 0 && (
        <div className="mb-3">
          <label className="fw-bold me-2">Sort by Price:</label>
          <select
            className="form-select d-inline w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      )}

      {wishlist.length === 0 ? (
        <div className="text-center">
          <h4>No items in your wishlist!</h4>
       
        </div>
      ) : (
        <>
          <div className="row w-100">
            {sortedWishlist.map((item) => (
              <div key={item.id} className="col-md-4 col-sm-6 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="text-truncate">{item.name}</h5>
                    <p className="fw-bold text-success">₹{item.price} x {item.quantity}</p>

                    {/* Quantity Controls */}
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button 
                        className="btn btn-sm btn-outline-secondary" 
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        ➖
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button 
                        className="btn btn-sm btn-outline-primary" 
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        ➕
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Display Total Wishlist Price */}
          <div className="text-center mt-4">
            <h4>Total Wishlist Price: <span className="fw-bold text-success">₹{totalWishlistPrice}</span></h4>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-secondary">⬅ Back to Shopping</Link>
      </div>
    </div>
  );
};

export default Wishlist;


