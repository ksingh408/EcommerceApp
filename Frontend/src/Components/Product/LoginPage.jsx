
// LoginPage.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slices/authReducer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      dispatch(loginUser(user)); 
      if (user.role === "admin") {
        navigate("/admin"); 
      } else if (user.role === "seller") {
        navigate("/seller"); 
      } else {
        navigate("/user"); 
      }
    } else {
      alert("Invalid email or password.");
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
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;

