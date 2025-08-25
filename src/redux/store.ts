
import { configureStore } from '@reduxjs/toolkit';
import { borrowApi } from './features/api/borrowSlice'; 
import { apiSlice } from './features/api/bookSlice'; 

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(borrowApi.middleware), 
});
