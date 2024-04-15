import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/api/axios";
export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (file_id) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.delete(`/api/deleteFile/${file_id}/${localStorage.getItem("user_id")}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
);

export const fetchFilesDb = createAsyncThunk("files/fetchFilesDb", async () => {
  try {
    const response = await axios.get(
      `/api/allFiles?user_id=${localStorage.getItem("user_id")}`
    );
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
        `/api/allFolders?user_id=${localStorage.getItem("user_id")}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  }
);
export const filesPerDay = createAsyncThunk(
  "filesDays/filesPerDay",
  async () => {
    let dateArr = [null, null, null, null, null, null, null];
    const date = new Date();
    await axios.get("/sanctum/csrf-cookie");
    await axios
      .post("/api/fetchFilesByDate", {
        headers: {
          "Content-Type": "application/json",
        },
        date: date.toISOString().split("T")[0],
        user_id: localStorage.getItem("user_id"),
      })
      .then((response) => {
        data = response.data;
        dateArr.splice(6, 1, data[0]["count"]);
        dateArr.splice(5, 1, data[1]["count"]);
        dateArr.splice(4, 1, data[2]["count"]);
        dateArr.splice(3, 1, data[3]["count"]);
        dateArr.splice(2, 1, data[4]["count"]);
        dateArr.splice(1, 1, data[5]["count"]);
        dateArr.splice(0, 1, data[6]["count"]);
      });
    return dateArr;
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
    filesPerD: (state, action) => {},
    del: (state) => {
      // handle delete logic here
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
      // console.log(state.Folder);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      // console.log(action.payload);
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
      .addCase(filesPerDay.fulfilled, (state, action) => {
        state.filesPerD = action.payload;
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
