import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Recipe } from '../Interfaces/Types';

export type SearchCache = {
  recipes: Recipe[];
  searchBox: string;
};

const initialState: SearchCache = {
  recipes: [],
  searchBox: '',
};

export const searchCacheSlice = createSlice({
  name: 'searchCache',
  initialState,
  reducers: {
    setCachedRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setCachedSearchBox: (state, action: PayloadAction<string>) => {
      state.searchBox = action.payload;
    },
  },
});
export const { setCachedRecipes, setCachedSearchBox } = searchCacheSlice.actions;

export const selectCachedRecipes = (state: RootState) => state.searchCache.recipes;
export const selectCachedSearchBox = (state: RootState) => state.searchCache.searchBox;

export default searchCacheSlice.reducer;
