import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist"; 

// 1. Configuration: Tells Redux Persist to use 'root' as the key in localStorage
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'] // Optional: only persist the auth slice
};

// 2. Combine all reducers into one root reducer
const rootReducer = combineReducers({
  auth: userSlice, 
});

// 3. Create a "persisted" version of our root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // 4. Middleware configuration:
  // Redux Toolkit has a strict check to ensure data is "serializable" (simple data).
  // Redux Persist uses complex data types for its internal logic, so we disable 
  // this check to prevent console errors.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// 5. The persistor is what actually handles the background syncing
export const persistor = persistStore(store);