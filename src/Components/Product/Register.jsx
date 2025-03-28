

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/Slices/authReducer";



function RegisterPage() {
        const [formData, setFormData] = useState({ name: "", email: "", password: "" });
        const dispatch = useDispatch();


const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };
 

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="bg-light shadow-lg p-5 rounded d-flex flex-column justify-content-center"
        style={{ width: "400px", height: "400px" }}
      >
        <h2 className="text-center mb-4">Register</h2>
        
        <input
          type="text"
          name="name"
          className="form-control mb-4"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="form-control mb-4"
          placeholder="Email"
          value={formData.email}
          onChange={ handleChange}
        />
        <input
          type="password"
          name="password"
          className="form-control mb-4"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;

