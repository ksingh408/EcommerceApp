
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import userData from "../../JsonData/Users.json"
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const registerUser= createAsyncThunk(
  "auth/register",async(userData,{rejectWithValue})=>{
    try{const response = await axios.post(`${API_URL}/register`,userData);
    return response.data;}
    catch(error){
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async ({email,password}, { rejectWithValue }) => {
  try {
      const response = await axios.post(`${API_URL}/login`, {email,password}, { withCredentials: true });
      console.log(response.data);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data.message);
  }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async (_,{rejectWithValue}) => {
  try{
   const response= await axios.post(`${API_URL}/logout`,{},{ withCredentials: true });
    return response.data; 
  }
  catch (error) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
 
});


  
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(registerUser.fulfilled, (state) => { state.error = null; })
          .addCase(registerUser.rejected, (state, action) => { state.error = action.payload; })

          .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload;
            state.error=null;
           })
           .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;  // Clear user state on logout
            state.error = null;
          })

          .addCase(logoutUser.rejected, (state, action) => {
            state.error = action.payload || "An error occurred during logout";
          });
  }
});

//export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
