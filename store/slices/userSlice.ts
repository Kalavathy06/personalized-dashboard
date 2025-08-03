import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  preferences: string[];
  darkMode: boolean;
  favorites: string[];
};

const initialState: UserState = {
  preferences: ['technology', 'business'],
  darkMode: false,
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setPreferences: (state, action: PayloadAction<string[]>) => {
      state.preferences = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
  },
});

export const { toggleDarkMode, setPreferences, addFavorite } = userSlice.actions;
export default userSlice.reducer;