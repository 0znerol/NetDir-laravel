import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Text } from "react-native";
import FileList from "./FileList";
export default function Search() {
  return (
    <Grid
      container
      xs={12}
      style={{ justifyContent: "center", paddingTop: 60 }}
    >
      <Grid item="true" xs={12}>
        <FileList fileType="/" />
      </Grid>
    </Grid>
  );
}
