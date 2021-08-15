import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type RecipeRating = {
  likedIds: number[];
};

const initialState: RecipeRating = {
  likedIds: [],
};

export const recipeRatingSlice = createSlice({
  name: 'recipeRating',
  initialState,
  reducers: {
    addLikedRecipe: (state, action: PayloadAction<number>) => {
      state.likedIds.push(action.payload);
    },
    removeLikedRecipe: (state, action: PayloadAction<number>) => {
      state.likedIds.splice(state.likedIds.indexOf(action.payload), 1);
    },
  },
});
export const { addLikedRecipe, removeLikedRecipe } = recipeRatingSlice.actions;

export const selectLikedRecipes = (state: RootState) => state.recipeRating.likedIds;

export default recipeRatingSlice.reducer;
