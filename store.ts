import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cachedRecipesSlice from './src/redux/cachedRecipesSlice';

export const store = configureStore({
  reducer: {
    cachedRecipes: cachedRecipesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
