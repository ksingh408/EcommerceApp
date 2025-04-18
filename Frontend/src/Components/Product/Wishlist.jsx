import React, { useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {  removeFromWishlist,getWishlistData ,removeFromWishlistAsync} from "../Redux/Slices/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist?.wishlistItems || []);
  const dispatch = useDispatch();
const data=getWishlistData();
console.log("data",data);
  useEffect(() => {
    dispatch(getWishlistData());
    
  },[], [dispatch]);
  
  // useEffect(() => {
  //   if (wishlist.length) {
  //     console.log("First wishlist item:", wishlist[0]);
  //   }
  // }, [wishlist]);
  

  //const [sortOrder, setSortOrder] = useState("default");

  // console.log("item:", item);

  // const sortedWishlist = [...wishlist].sort((a, b) => {
  //   if (sortOrder === "lowToHigh") return a.price - b.price;
  //   if (sortOrder === "highToLow") return b.price - a.price;
  //   return 0;
  // });

 
  const totalWishlistPrice = wishlist.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-5 d-flex flex-column align-items-center" style={{ width: "80%" }}>
      <h2 className="text-center mt-5 mb-4">💖 Your Wishlist</h2>

     
      {wishlist.length === 0 ? (
        <div className="text-center">
          <h4>No items in your wishlist!</h4>
       </div>
      ) : (
        <>
          <div className="row w-100">
            {wishlist.map((item) => (
              <div key={item._id || item.id} className="col-md-4 col-sm-6 mb-4">
                <div className="card shadow-sm">
                
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="text-truncate">{item.name}</h5>
                   
                    <p className="fw-bold text-success">₹{item.price}</p>

                  
                        
                    {/* Remove Button */}
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => {
                      //  dispatch(removeFromWishlist(item.id))
                      
                          dispatch(removeFromWishlistAsync(item.id));
                        }
                        
                      }
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

         
          <div className="text-center mt-4">
            <h4>Total Wishlist Price: <span className="fw-bold text-success">₹{totalWishlistPrice}</span></h4>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <Link to="/user" className="btn btn-outline-secondary">⬅ Back to Shopping</Link>
      </div>
    </div>
  );
};

export default Wishlist;


