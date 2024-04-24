import { Grid } from "@mui/material";
import React from "react";
import { Text } from "react-native-paper";
import { accent, background } from "../src/variables/Colors";
import { Pressable } from "react-native";
import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      style={{
        height: "100vh",
        backgroundColor: background,
        marginTop: 120,
        textAlign: "center",
        alignContent: "start",
      }}
    >
      <Grid item xs={12} style={{ marginTop: 30 }}>
        <Text style={{ fontSize: "1.5em" }}>Not Found</Text>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Text>The page you are looking for does not exist.</Text>
        </Grid>
        <Grid item xs={12} style={{}}>
          <Pressable
            style={{ textAlign: "center" }}
            onPress={() => {
              navigate("/Home");
            }}
          >
            <Text style={{ margin: "auto", color: accent }}>Go back home</Text>
          </Pressable>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotFoundScreen;
