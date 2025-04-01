// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   // const navigate = useNavigate();
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:5000/auth/check", { withCredentials: true })
//   //     .then((res) => {
//   //       if (res.data.authenticated) {
//   //         setIsAuthenticated(true);
//   //         navigate("/dashboard");
//   //       }
//   //     })
//   //     .catch(() => setIsAuthenticated(false));
//   // }, [navigate]);

//   // const handleGoogleLogin = () => {
//   //   window.location.href = "http://localhost:5000/auth/google";
//   // };

//   // return (
//   //   <div className="flex flex-col items-center justify-center min-h-screen">
//   //     <h1 className="text-2xl font-bold mb-4">Login</h1>
//   //     {!isAuthenticated ? (
//   //       <button
//   //         onClick={handleGoogleLogin}
//   //         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//   //       >
//   //         Login with Google
//   //       </button>
//   //     ) : (
//   //       <p>You are already logged in.</p>
//   //     )}
//   //   </div>
//   // );


// };

// // export default Login;
// import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";

// const Login = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };

// export default Login;