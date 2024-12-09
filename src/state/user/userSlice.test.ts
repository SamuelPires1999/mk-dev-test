import { configureStore } from "@reduxjs/toolkit";
import userReducer, { clearUsers, UserState } from "./userSlice";
import { addUser } from "./actions/addUser";
import { User } from "./types";

describe("userSlice", () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };

  // Test initial state
  test("should return the initial state", () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
    });

    expect(store.getState().user).toEqual(initialState);
  });

  // Test clearUsers reducer
  test("clearUsers should reset users array", () => {
    const previousState: UserState = {
      users: [
        {
          id: Math.floor(Math.random() * 10000),
          age: 40,
          company: "ACME",
          email: "JHON@acme.com",
          name: "JHON",
        },
      ],
      loading: false,
      error: null,
    };

    const nextState = userReducer(previousState, clearUsers());

    expect(nextState.users).toEqual([]);
  });

  // Test addUser async thunk - pending state
  test("addUser.pending should set loading to true", () => {
    const previousState = initialState;
    const nextState = userReducer(previousState, {
      type: addUser.pending.type,
    });

    expect(nextState).toEqual({
      users: [],
      loading: true,
      error: null,
    });
  });

  // Test addUser async thunk - fulfilled state
  test("addUser.fulfilled should add user and stop loading", () => {
    const previousState: UserState = {
      users: [],
      loading: false,
      error: null,
    };

    const newUser: User = {
      id: 230,
      name: "Jane Doe",
      age: 40,
      company: "ACME",
      email: "JHON@acme.com",
    };
    const nextState = userReducer(previousState, {
      type: addUser.fulfilled.type,
      payload: newUser,
    });

    expect(nextState).toEqual({
      users: [newUser],
      loading: false,
      error: null,
    });
  });

  // Test addUser async thunk - rejected state
  test("addUser.rejected should set error and stop loading", () => {
    const previousState = {
      users: [],
      loading: true,
      error: null,
    };

    const errorMessage = "Failed to add user";
    const nextState = userReducer(previousState, {
      type: addUser.rejected.type,
      payload: errorMessage,
    });

    expect(nextState).toEqual({
      users: [],
      loading: false,
      error: errorMessage,
    });
  });
});
