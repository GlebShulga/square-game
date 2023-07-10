import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameFieldReducer from './slices/gameFiledSlice';

export const store = configureStore({
  reducer: {
    gameField: gameFieldReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
