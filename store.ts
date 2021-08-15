import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import recipeRatingSlice from './src/redux/recipeRatingSlice';
import searchCacheSlice from './src/redux/searchCacheSlice';

export const store = configureStore({
  reducer: {
    searchCache: searchCacheSlice,
    recipeRating: recipeRatingSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
