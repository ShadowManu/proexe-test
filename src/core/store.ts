import { configureStore } from "@reduxjs/toolkit";

import {
  adapter as usersAdapter,
  slice as usersSlice,
  actions as usersActions,
} from "./users-slice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const selectors = {
  users: usersAdapter.getSelectors<RootState>((state) => state.users),
};

export const actions = { users: usersActions };
