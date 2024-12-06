import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types";

export const addUser = createAsyncThunk(
  "users/addUser",
  async (
    {
      newUser,
      shouldFail = false,
    }: {
      newUser: Omit<User, "id">;
      shouldFail?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userWithId = {
        ...newUser,
        id: Math.floor(Math.random() * 10000),
      };

      if (shouldFail) {
        throw new Error("Failed to add user");
      }

      return userWithId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to add user"
      );
    }
  }
);
