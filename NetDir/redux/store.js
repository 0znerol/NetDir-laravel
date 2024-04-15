import { configureStore } from "@reduxjs/toolkit";
import FileReducer from "./slices/FileSlice";

const store = configureStore({
  reducer: {
    allFiles: FileReducer,
  },
});

export default store;
