import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
{ id: 1, name: "John Doe", email: "john@example.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ],
  sellers: [
    { id: 101, name: "Seller A", email: "sellerA@example.com", productCount: 5 },
    { id: 102, name: "Seller B", email: "sellerB@example.com", productCount: 8 },
  ],    
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export default adminSlice.reducer;
