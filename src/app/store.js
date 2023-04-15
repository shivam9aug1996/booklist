import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import languageReducer from "../features/language/LanguageSlice";
import bookReducer from "../features/books/BookSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    language: languageReducer,
    book: bookReducer,
  },
});
