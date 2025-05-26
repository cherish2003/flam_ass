import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BookmarksState } from '@/types';

const initialState: BookmarksState = {
  bookmarkedEmployees: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const employeeId = action.payload;
      const index = state.bookmarkedEmployees.indexOf(employeeId);
      
      if (index === -1) {
        state.bookmarkedEmployees.push(employeeId);
      } else {
        state.bookmarkedEmployees.splice(index, 1);
      }
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      const employeeId = action.payload;
      state.bookmarkedEmployees = state.bookmarkedEmployees.filter(
        (id) => id !== employeeId
      );
    },
  },
});

export const { toggleBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer; 