import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slices/authReducer";

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
      await dispatch(loginUser({ email, password })).unwrap();
      
      if (currentUser.role === "admin") {
        navigate("/admin");
      } else if (currentUser.role === "seller") {
        navigate("/seller");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert(err || "Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="bg-light shadow-lg p-5 rounded d-flex flex-column justify-content-center"
        style={{ width: "400px", height: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <input
          type="email"
          className="form-control mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;