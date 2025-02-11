import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ users, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      navigate("/services");
    } else {
      alert("User not found. Please sign up");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="bg-light shadow-lg p-5 rounded d-flex flex-column justify-content-center"
        style={{ width: "350px", height: "375px" }} // Increased height
      >
        <h2 className="text-center mb-4">Login</h2>
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
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage({ users ,setCurrentUser}) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
    
//     const user = users.find((u)=>u.email===email && u.password===password);
//     if(user){
//         setCurrentUser(user);
//         navigate("/services");    
// }
   
//      else {
//       alert("User not found. Please sign up");
//     }
//   };

//   return (
//    <div className="d-flex justify-content-center" >
//     <div className="d-flex flex-sm-column  bd-highlight mb-3 bg-green-800 shadow-lg mt-5 h-200" style={{ width: '28%' }}>
//       <h2 className="text-xl text-lg-center font-semibold mb-4">Login</h2>
//       <input
//         type="email"
//         className="w-full p-2 mb-4 border rounded"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         className="w-full p-2 mb-4 border rounded"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         onClick={handleLogin}
//         className="w-75 ms-5 bg-blue-400 text-black p-2 rounded"
//       >
//         Login
//       </button>
//     </div>
//     </div>
//   );
// }

// export default LoginPage;