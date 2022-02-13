import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { userAPI } from "./axios";

import { User } from "./types";

const SLICE_NAME = "users" as const;

export const fetchAll = createAsyncThunk(`${SLICE_NAME}/fetchAll`, async () => {
  const response = await userAPI.fetchAll();
  return response.data;
});

export const addOne = createAsyncThunk(
  `${SLICE_NAME}/addOne`,
  async (user: User) => {
    const response = await userAPI.addOne(user);
    return response.data;
  }
);

export const updateOne = createAsyncThunk(
  `${SLICE_NAME}/updateOne`,
  async ({ id, user }: { id: number; user: User }) => {
    const response = await userAPI.updateOne(id, user);
    return response.data;
  }
);

export const removeOne = createAsyncThunk(
  `${SLICE_NAME}/delete`,
  async (id: number) => {
    await userAPI.removeOne(id);
    return id;
  }
);

export const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id ?? user.email,
  sortComparer: false,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        return adapter.setAll(state, action.payload);
      })
      .addCase(addOne.fulfilled, (state, action) => {
        return adapter.addOne(state, action.payload);
      })
      .addCase(updateOne.fulfilled, (state, action) => {
        return adapter.updateOne(state, {
          id: action.payload.id!,
          changes: action.payload,
        });
      })
      .addCase(removeOne.fulfilled, (state, action) => {
        return adapter.removeOne(state, action.payload);
      });
  },
});

export const actions = { fetchAll, addOne, updateOne, removeOne };
