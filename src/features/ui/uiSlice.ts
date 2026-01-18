import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface UIState {
  theme: ThemeMode;
}

const initialState: UIState = {
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
