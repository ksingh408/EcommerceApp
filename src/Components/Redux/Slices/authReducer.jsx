import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "k@12.com",
      password: "k123", 
      role: "user",
      wishlist: [101, 102],
      cart: [
        { productId: 103, quantity: 2 },
        { productId: 104, quantity: 1 },
      ],
      address: {
        street: "123 Main St",
        city: "Indore",
        state: "MP",
        zip: "452001",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "password456", 
      role: "admin",
      wishlist: [105, 106],
      cart: [],
      address: {
        street: "456 Elm St",
        city: "Indore",
        state: "MP",
        zip: "452002",
      },
    },
  ],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;

      console.log("Login Attempt:", email, password);

      const foundUser = state.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (foundUser) {
        if (foundUser.password === password) {
          console.log("User Found:", foundUser);
          state.user = { ...foundUser, password: undefined }; 
          
        } else {
          console.log("Incorrect Password");
          state.user = null;
        }
      } else {
        console.log("User Not Found");
        state.user = null;
      }
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   users: [
//     {
//       id: 1,
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "password123",
//       role: "user",
//       wishlist: [101, 102],
//       cart: [{ productId: 103, quantity: 2 }, { productId: 104, quantity: 1 }],
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "janesmith@example.com",
//       password: "password456",
//       role: "admin",
//       wishlist: [105, 106],
//       cart: [],
//     },
//   ],
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginUser: (state, action) => {
//       const { email, password } = action.payload;
//       const foundUser = state.users.find(
//         (user) => user.email.toLowerCase() === email.toLowerCase()
//       );

//       if (foundUser && foundUser.password === password) {
//         state.user = { ...foundUser, password: undefined };
//         localStorage.setItem("authUser", JSON.stringify(state.user)); // Store login state
//       } else {
//         state.user = null;
//       }
//     },
//     logoutUser: (state, action) => {
//       state.user = null;
//       localStorage.removeItem("authUser"); // Clear auth state
//       action.payload("/"); // Redirect to home page
//     },
//   },
// });

// export const { loginUser, logoutUser } = authSlice.actions;
// export default authSlice.reducer;
