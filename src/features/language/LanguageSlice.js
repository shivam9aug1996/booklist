import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLanguage: {},
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateSelectedLanguage: (state, action) => {
      if (action.payload)
        localStorage.setItem(
          "selectedLanguage",
          JSON.stringify(action.payload)
        );
      state.selectedLanguage = action.payload;
    },
    startApp: (state, action) => {
      let data = localStorage.getItem("selectedLanguage");
      if (data) {
        data = JSON.parse(data);
      }
      state.selectedLanguage = data;
    },
  },
});

export const { updateSelectedLanguage, startApp } = languageSlice.actions;

export const selectedLanguage = (state) => state.language.selectedLanguage;

export default languageSlice.reducer;
