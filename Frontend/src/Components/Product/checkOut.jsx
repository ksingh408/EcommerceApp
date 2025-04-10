import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/Slices/addtoCart"; 
import { Card, Dropdown } from "react-bootstrap";

const Checkout = () => {
  const cart = useSelector((state) => state.cart?.cartItems || []);
  const totalCartPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handlePayment = () => {
    setPaymentSuccess(true);
    navigate("/order-success");
    setTimeout(() => {
     
      dispatch(clearCart()); 
    
    }, 2000);
  };

  return (
    <div className="container mt-5 min-vh-100">
      <h2 className="text-center mb-4 mt-5">Checkout</h2>

      {cart.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your cart is empty! Please add items to your cart before checking out.</h4>
          <Link to="/services" className="btn btn-outline-secondary mt-3">Go to Shopping</Link>
        </div>
      ) : (
        <div className="mt-5 bg-light">
          <div className="row">
            <div className="col-md-6">
              <h4>Order Summary</h4>
              <ul className="list-group">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item d-flex flex-column justify-content-between">
                    <span>{item.name}</span>
                    <Card.Img
                  className="card-img-top"
                  style={{ height: "150px",width:"150", objectFit: "cover" }}
                  src={item.image}
                 /> 
                    <span>₹{item.price} x {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mt-3">Total: ₹{totalCartPrice}</h4>
            </div>

            <div className="col-md-6">
              <h4>Payment</h4>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  className="form-control"
                  placeholder="Enter card number"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  className="form-control"
                  placeholder="MM/YY"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="form-control"
                  placeholder="CVV"
                />
              </div>

              <button className="btn btn-success mt-4 w-50" onClick={handlePayment}>
                Pay ₹{totalCartPrice}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
