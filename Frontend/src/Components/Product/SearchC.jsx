// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchQuery, setSearchResults } from "../Redux/Slices/SearchSlice";

// const SearchComponent = () => {
//   const dispatch = useDispatch();
//   const query = useSelector((state) => state.search.query);
//   const results = useSelector((state) => state.search.results);

//   const [searchTerm, setSearchTerm] = useState(query);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       dispatch(setSearchQuery(searchTerm));
//       fetchSearchResults(searchTerm);
//     }, 500); // Debounce time: 500ms

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm, dispatch]);

//   const fetchSearchResults = async (query) => {
//     if (!query) {
//       dispatch(setSearchResults([]));
//       return;
//     }

//     // Mock API call (replace with real API)
//     const mockResults = [
//       "React",
//       "Redux",
//       "React Router",
//       "React Native",
//       "Redux Toolkit",
//     ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));

//     dispatch(setSearchResults(mockResults));
//   };

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="border p-2 w-full rounded-md"
//       />
//       <ul className="mt-2">
//         {results.map((result, index) => (
//           <li key={index} className="p-2 border-b">
//             {result}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchComponent;
