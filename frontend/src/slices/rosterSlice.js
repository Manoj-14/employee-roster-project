import { createSlice } from "@reduxjs/toolkit";

const initialState = { roster: null };

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    setRoster: (state, action) => {
      state.roster = action.payload;
    },
    updateShift: (state, action) => {
      console.log("action", action.payload);
      return {
        ...state,
        roster: {
          ...state.roster,
          shift: action.payload,
        },
      };
    },
  },
});

export const { setRoster, updateShift } = rosterSlice.actions;
export default rosterSlice.reducer;
