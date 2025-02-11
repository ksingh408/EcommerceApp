import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = ({ users, setUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (users.some((user) => user.email === email)) {
      alert("User already exists. Please login.");
      navigate("/Login");
      return;
    }
    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    alert("Signup successful. Please login.");
    navigate("/Login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="bg-light shadow-lg p-4 rounded d-flex flex-column justify-content-center"
        style={{ width: "400px", height: "450px" }} // Increased height for spacing
      >
        <h2 className="text-center mb-8">Sign Up</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
