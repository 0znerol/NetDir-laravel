import React from "react";
import Login from "../src/Components/Login";
import Register from "../src/Components/RegisterForm";
import { Grid } from "@mui/material";

export default function () {
  return (
    <Grid
      container
      style={{
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Login></Login>
    </Grid>
  );
}
