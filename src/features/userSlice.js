import { createSlice } from "@reduxjs/toolkit";

let dataFromLocalStore = () => {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      user: null,
      isAuthState: false,
    }
  );
};

let userSlice = createSlice({
  name: "user",
  initialState: dataFromLocalStore(),
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      userSlice.caseReducers.setLocal(state);
    },
    logout: (state) => {
      state.user = null;
      userSlice.caseReducers.setLocal(state);
    },
    isAuthChange: (state, { payload }) => {
      state.isAuthState = payload;
      userSlice.caseReducers.setLocal(state);
    },
    setLocal: (state) => {
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export let { isAuthChange, login, logout } = userSlice.actions;

export default userSlice.reducer;
