import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '../features/portsApi';
import todoReducer from '../features/postsSlice'


export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
