import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateShift: (state, action) => {
      console.log("action", action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          shift: action.payload,
        },
      };
    },
  },
});

export const { setUser, updateShift } = userSlice.actions;
export default userSlice.reducer;
