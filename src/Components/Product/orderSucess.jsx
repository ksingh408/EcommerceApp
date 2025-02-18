import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container mt-5 text-center min-vh-100">
      <h2 className="text-success mt-5">Order Successful 🎉</h2>
      <p>Your order has been successfully placed. Thank you for shopping with us!</p>
      <Link to="/user" className="btn btn-primary">Go Back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
