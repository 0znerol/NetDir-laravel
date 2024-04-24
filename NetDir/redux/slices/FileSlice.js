import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../src/api/axios";
export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (file_id) => {
    try {
      const response = await axios.delete(`/api/deleteFile/${file_id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
);

export const fetchFilesDb = createAsyncThunk("files/fetchFilesDb", async () => {
  try {
    const response = await axios.get(`/api/allFiles`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
});
export const fetchFoldersDb = createAsyncThunk(
  "folders/fetchFoldersDb",
  async () => {
    try {
      const response = await axios.get(
        `/api/allFolders?user_id=${
          JSON.parse(localStorage.getItem("logged_user")).id
        }`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  }
);
export const FileSlice = createSlice({
  name: "allFiles",
  initialState: {
    value: [],
    filesPerD: [],
    search: "",
    folders: [],
    user: [],
  },
  reducers: {
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesDb.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(fetchFoldersDb.fulfilled, (state, action) => {
        state.folders = action.payload;
      });
  },
});

export const { upload, del, modify, setSearch, addFolder, setUser } =
  FileSlice.actions;

export default FileSlice.reducer;
