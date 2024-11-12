// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice-tech';
import contentReducer from './contentSlice-tech';

// Configuring store with devTools support, middleware, and reducers
export const store = configureStore({
  reducer: {
    admin: adminReducer, // Adding the adminReducer to the store
  },
  reducer: {
    content: contentReducer,
  },
  // Middleware for additional functionality (e.g., logging, asynchronous operations)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // Enabling Redux DevTools for better debugging
  devTools: process.env.NODE_ENV !== 'production',  // Only enable in non-production environments
});
