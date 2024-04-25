import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { accent, border, background, nDark } from "../variables/Colors";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFolder } from "../../redux/slices/FileSlice";
import { useEffect, useState } from "react";
import { fetchFoldersDb } from "../../redux/slices/FileSlice";
import axios from "../api/axios";
import { host } from "../variables/Network";
export default function AddFolder() {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.allFiles.folders);
  useEffect(() => {
    dispatch(fetchFoldersDb());
  }, []);
  const addFolder = async () => {
    let input = document.querySelector("#FolderInput");

    const folderExists = folders.some(
      (folder) => folder.folder_name === input.value
    );

    if (folderExists) {
      alert("Folder already exists");
    } else {
      // const user_id = JSON.parse(localStorage.getItem("logged_user")).id;
      const formData = new FormData();
      formData.append("folder", input.value);
      // formData.append("user_id", user_id);
      console.log(formData);
      // await axios.get("/sanctum/csrf-cookie");
      await axios
        .post(`http://${host}:8000/api/addFolder`, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          input.value = "";
          dispatch(fetchFoldersDb());
        })
        .catch((error) => {
          console.error("Error uploading folder:", error);
        });
      // // Send the fetch request
      // fetch("http://localhost:8000/api/addFolder", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ folder: input.value }),
      // }).then((response) => {
      //   input.value = "";
      //   dispatch(fetchFoldersDb());
      // });
    }
  };

  return (
    <Grid container xs={12} style={{ padding: 0 }}>
      <Grid container xs={12} style={{ padding: 10 }}>
        <Text style={{ color: "lightgray", padding: 10, fontSize: "1em" }}>
          Add Folder
        </Text>
      </Grid>
      <Grid
        container
        xs={12}
        style={{ display: "flex", alignContent: "space-between" }}
      >
        <Grid
          item="true"
          xs={10}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <input
            type="text"
            id="FolderInput"
            style={{
              //display:"none",
              margin: "auto",
              width: "95%",
              height: "3vh",
              fontSize: "1em",
              // marginbottom: 10,
              backgroundColor: nDark,
              border: "3px solid " + nDark,
              borderRadius: 5,
              color: "white",
            }}
          ></input>
        </Grid>
        <Grid item="true" xs={2} style={{ margin: "auto", textAlign: "end" }}>
          <IconButton style={{ padding: 10 }} onClick={addFolder}>
            <CreateNewFolderIcon
              //   color="lightgray"
              style={{ color: accent, fontSize: "1.5em", margin: "auto" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
