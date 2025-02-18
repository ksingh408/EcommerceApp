import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseCartQuantity, decreaseCartQuantity, removeFromCart } from "../Redux/Slices/addtoCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart?.cartItems || []);
  const dispatch = useDispatch();

  const totalCartPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="container mt-5 d-flex flex-column align-items-center min-vh-100" style={{ width: "80%" }}>
      <h2 className="text-center mt-5 mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty!</h4>
        </div>
      ) : (
        <>
          <div className="row w-100">
            {cart.map((item) => (
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

                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button 
                        className="btn btn-sm btn-outline-secondary" 
                        onClick={() => dispatch(decreaseCartQuantity(item.id))}
                      >
                        ➖
                      </button>
                      <span className="fw-bold">{item.quantity}</span> {/* ✅ Quantity display restored */}
                      <button 
                        className="btn btn-sm btn-outline-primary" 
                        onClick={() => dispatch(increaseCartQuantity(item.id))}
                      >
                        ➕
                      </button>
                    </div>

                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Display Total Cart Price */}
          <div className="text-center mt-4">
            <h4>Total Cart Price: <span className="fw-bold text-success">₹{totalCartPrice}</span></h4>
          </div>

      
          <div className="text-center mt-4">
            <Link to="/checkout" className="btn btn-success">Buy Now</Link>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <Link to="/user" className="btn btn-outline-secondary">⬅ Back to Shopping</Link>
      </div>
    </div>
  );
};

export default Cart;
