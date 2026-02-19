import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,           // Stores the user profile { id, username, email }
  loading: false,      // Used to show spinners while the API is "in flight"
  isAuthenticated: false, // The "Security Badge" to lock/unlock routes
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 1. Triggered immediately when the 'Sign In' button is clicked
    loginStart: (state) => {
      state.loading = true;
    },
    // 2. Triggered when the backend sends back a success (200) response
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload; // Payload is the user data from backend
    },
    // 3. Triggered if the backend returns an error (400, 401, 500)
    loginFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    // 4. Triggered when the user clicks the 'Logout' button
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { loginFailure, loginStart, logout, loginSuccess } = userSlice.actions;
export default userSlice.reducer;