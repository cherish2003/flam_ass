import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UiState } from '@/types';

const initialState: UiState = {
  theme: 'light',
  sidebarOpen: true,
  sidebarMinimized: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebarMinimized: (state) => {
      state.sidebarMinimized = !state.sidebarMinimized;
    },
    setSidebarMinimized: (state, action: PayloadAction<boolean>) => {
      state.sidebarMinimized = action.payload;
    },
  },
});

export const { toggleTheme, toggleSidebar, setSidebarOpen, toggleSidebarMinimized, setSidebarMinimized } = uiSlice.actions;
export default uiSlice.reducer; 