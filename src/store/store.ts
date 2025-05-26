import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices/employeesSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import uiReducer from './slices/uiSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '@';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    bookmarks: bookmarksReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 