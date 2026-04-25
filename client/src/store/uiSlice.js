import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'light';
  }
  return 'light';
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: getInitialTheme(),
    searchQuery: '',
    recentlyViewed: [], // stores food IDs
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
      }
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    addRecentlyViewed(state, action) {
      const id = action.payload;
      state.recentlyViewed = [id, ...state.recentlyViewed.filter((i) => i !== id)].slice(0, 8);
    },
  },
});

export const selectTheme          = (s) => s.ui.theme;
export const selectSearchQuery    = (s) => s.ui.searchQuery;
export const selectRecentlyViewed = (s) => s.ui.recentlyViewed;

export const { toggleTheme, setTheme, setSearchQuery, addRecentlyViewed } = uiSlice.actions;
export default uiSlice.reducer;
