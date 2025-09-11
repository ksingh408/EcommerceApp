import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slices/authReducer";
import { fetchCartData } from "../Redux/Slices/addtoCart.jsx"; // Import fetchCartData action
import { getWishlistData} from "../Redux/Slices/wishlistSlice.jsx";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const user = await dispatch(loginUser({ email, password })).unwrap();
      // Fetch cart data after login
      await dispatch(fetchCartData());
      // await dispatch(getWishlistData());
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "seller") {
        navigate("/seller");
      } else {
         // Fetch cart data after login
        navigate("/user");
      }
    } catch (err) {
      alert(err || "Login failed. Please try again.");
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div
      className="bg-white shadow-lg p-5 rounded-4"
      style={{ width: "400px", minHeight: "470px" }}
    >
      {/* Heading */}
      <h2 className="text-center mb-4 fw-bold text-primary">Welcome Back</h2>
      <p className="text-center text-muted mb-4">
        Please login to continue
      </p>

      {/* Email input */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password input */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Login button */}
      <button
        className="btn btn-primary w-100 py-2 fw-semibold"
        onClick={() => handleLogin(email, password)}
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>

      {/* Error message */}
      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {/* Signup link */}
      <p className="text-center mt-4 text-muted">
  Don’t have an account?{" "}
  <span
    role="button"
    className="fw-semibold text-primary text-decoration-none"
    onClick={() => navigate("/signin")}
  >
    Sign Up
  </span>
</p>

    </div>
  </div>
  );
}

export default LoginPage;