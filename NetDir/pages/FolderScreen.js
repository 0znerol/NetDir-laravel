import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { accent, border, background, nDark } from "../src/variables/Colors";
import AddFolder from "../src/Components/AddFolder";
import { Platform, Pressable, Text } from "react-native";
import { Card } from "react-native-paper";
import AllFolders from "../src/Components/AllFolders";
import { V2Example } from "../src/Components/V2Example";
export default function FolderScreen() {
  const [resetPosition, setResetPosition] = useState(false);
  useEffect(() => {
    if (resetPosition) {
      localStorage.removeItem("dragPositions");
      setResetPosition(false);
      window.location.reload();
    }
  }, [resetPosition]);

  return (
    <Grid
      container
      style={{
        display: "flex",
        backgroundColor: background,
        minHeight: "100vh",
        width: "100%",
        paddingTop: 75,
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          backgroundColor: background,
          // padding: 0,
          alignContent: "start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid
          item={true}
          xs={12}
          style={{
            // paddingTop: 60,
            width: "100%",
            height: "fit-content",
          }}
        >
          {Platform.OS === "web" ? (
            <Card
              style={{
                borderRadius: 4,
                borderWidth: 3,
                borderColor: border,
                margin: 10,
                // width: "100%",
              }}
            >
              <Card.Content style={{ padding: 0, paddingBottom: 10 }}>
                <AddFolder />
              </Card.Content>
            </Card>
          ) : null}
        </Grid>

        <Grid
          container
          // xs={11}
          style={{
            // margin: "auto",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            // xs={15}
            style={{
              margin: 10,
              height: "fit-content",
              width: "100%",
            }}
          >
            <Pressable
              style={{
                backgroundColor: accent,
                borderRadius: 5,
                padding: 5,
                // margin: 20,
                // marginLeft: 85,
              }}
              onPress={() => {
                setResetPosition(true);
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  // fontWeight: "bold",
                }}
              >
                reset position
              </Text>
            </Pressable>
          </Grid>

          <AllFolders resetCheck={resetPosition} />
          {/* <V2Example></V2Example> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
