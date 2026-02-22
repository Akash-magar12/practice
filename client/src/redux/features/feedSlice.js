import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feeds: [],
  },
  reducers: {
    // Used when fetching ALL posts from the database
    setFeeds: (state, action) => {
      state.feeds = action.payload;
    },
   
  },
});

export const { setFeeds, addSinglePost } = feedSlice.actions;
export default feedSlice.reducer;