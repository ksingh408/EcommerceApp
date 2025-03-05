// import React from "react";
// import { Link } from "react-router-dom";
// import { FaTachometerAlt, FaUsers, FaBox, FaShoppingCart, FaStore } from "react-icons/fa";

// const Dashboard = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">

//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white p-5">
//         <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
//         <ul>
//           <li className="mb-4">
//             <Link to="/admin" className="flex items-center gap-2 hover:text-gray-300">
//               <FaTachometerAlt /> Dashboard
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/admin/users" className="flex items-center gap-2 hover:text-gray-300">
//               <FaUsers /> Users
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/admin/products" className="flex items-center gap-2 hover:text-gray-300">
//               <FaBox /> Products
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/admin/orders" className="flex items-center gap-2 hover:text-gray-300">
//               <FaShoppingCart /> Orders
//             </Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/seller" className="flex items-center gap-2 hover:text-gray-300">
//               <FaStore /> Seller Panel
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 shadow rounded-lg">
//             <h3 className="text-xl font-semibold">Total Users</h3>
//             <p className="text-2xl font-bold">120</p>
//           </div>
//           <div className="bg-white p-6 shadow rounded-lg">
//             <h3 className="text-xl font-semibold">Total Products</h3>
//             <p className="text-2xl font-bold">350</p>
//           </div>
//           <div className="bg-white p-6 shadow rounded-lg">
//             <h3 className="text-xl font-semibold">Total Orders</h3>
//             <p className="text-2xl font-bold">95</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
