import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { userAPI } from "./axios";

import { User } from "./types";

const SLICE_NAME = "users" as const;

export const fetchAll = createAsyncThunk(`${SLICE_NAME}/fetchAll`, async () => {
  const response = await userAPI.fetchAll();
  return response.data;
});

export const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: false,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      return adapter.setAll(state, action.payload);
    });
  },
});

export const actions = { fetchAll };
