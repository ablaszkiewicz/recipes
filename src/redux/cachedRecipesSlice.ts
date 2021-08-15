import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Recipe } from '../Interfaces/Types';

export type CachedRecipes = {
  value: Recipe[];
};

const initialState: CachedRecipes = {
  value: [],
};

export const cachedRecipesSlice = createSlice({
  name: 'cachedRecipes',
  initialState,
  reducers: {
    setCachedRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.value = action.payload;
    },
  },
});
export const { setCachedRecipes: setCachedRecipes } = cachedRecipesSlice.actions;

export const selectCachedRecipes = (state: RootState) => state.cachedRecipes.value;
export default cachedRecipesSlice.reducer;
