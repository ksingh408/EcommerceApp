
// LoginPage.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../Redux/Slices/authReducer";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error,loading}
   = useSelector((state) => state.auth);


const handleLogin = () => {
  dispatch(loginUser({ email, password }))
    .unwrap()
    .then((response) => {
      if (response.role === "admin") {
        navigate("/admin");
      } else if (response.role === "seller") {
        navigate("/seller");
      } else {
        navigate("/user");
      }
    })
    .catch((err) => {
      const errorMessage = typeof err === "string" ? err : "Invalid email or password.";
      alert(errorMessage);
    });
};

const { loginWithRedirect } = useAuth0();

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

        <Link className="btn btn-primary w-100 mt-2"
             onClick={() => loginWithRedirect()}>
              login with google
              </Link>
      </div>
    </div>
  );
}

export default LoginPage;

