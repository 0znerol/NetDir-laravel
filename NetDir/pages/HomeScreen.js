import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { Platform } from "react-native";
import { Provider } from "react-redux";
import { PaperProvider, DarkTheme, DefaultTheme } from "react-native-paper";
import store from "../redux/store";
import Chart from "../src/Components/Chart";
import TotalFiles from "../src/Components/TotalFiles";
import UploadFile from "../src/Components/UploadFile";
import FileList from "../src/Components/FileList";
import { background, border } from "../src/variables/Colors";
export default function HomeScreen() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <Grid
      container
      style={{
        paddingTop: 75,
        // paddingLeft: 10,
        // paddingRight: 10,
        // minHeight: "100vh",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Provider store={store}>
        <PaperProvider theme={DarkTheme}>
          <Grid container>
            <Grid container>
              <Grid item={true} xs={12} md={6}>
                {Platform.OS === "web" ? (
                  <Card
                    style={{
                      borderRadius: 4,
                      borderWidth: 3,
                      borderColor: border,
                      margin: 10,
                      backgroundColor: background,
                    }}
                  >
                    <Card.Content>
                      <Chart />
                    </Card.Content>
                  </Card>
                ) : null}
              </Grid>

              <Grid
                item={true}
                md={6}
                style={{
                  width: "100%",
                }}
              >
                <Grid
                  container
                  direction="column"
                  style={{
                    height: "100%",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Grid
                    item={true}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      style={{
                        borderRadius: 4,
                        borderWidth: 3,
                        borderColor: border,
                        margin: 10,
                        width: "fit-content",
                        backgroundColor: background,
                      }}
                    >
                      <Card.Content>{<TotalFiles />}</Card.Content>
                    </Card>
                  </Grid>

                  <Grid item={true}>
                    <Card
                      style={{
                        borderRadius: 4,
                        borderWidth: 3,
                        borderColor: border,
                        margin: 10,
                        backgroundColor: background,
                      }}
                    >
                      <Card.Content>{<UploadFile />}</Card.Content>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* // second row */}

            <Grid
              container
              style={{
                justifyContent: "space-around",
                // width: "100%",
                // padding: 10,
              }}
            >
              <Grid
                item={true}
                // container
                xs={12}
                md={6}
                style={{
                  padding: 10,
                }}
              >
                {Platform.OS === "web" ? <FileList fileType="image" /> : null}
              </Grid>

              <Grid
                // item={true}
                item={true}
                xs={12}
                md={6}
                style={{
                  padding: 10,
                }}
              >
                {Platform.OS === "web" ? <FileList fileType="video" /> : null}
              </Grid>
            </Grid>
            {/* // third row */}

            <Grid
              container
              style={{
                justifyContent: "space-around",
                // width: "100%",
                // padding: 10,
              }}
            >
              <Grid
                // item={true}
                item={true}
                xs={12}
                md={6}
                style={{
                  padding: 10,
                }}
              >
                {Platform.OS === "web" ? <FileList fileType="text" /> : null}
              </Grid>

              <Grid
                // item={true}
                item={true}
                xs={12}
                md={6}
                style={{
                  padding: 10,
                }}
              >
                {Platform.OS === "web" ? <FileList fileType="audio" /> : null}
              </Grid>
            </Grid>
            {/* // fourth row */}

            <Grid
              container
              style={{
                justifyContent: "space-around",
                // width: "100%",
                // padding: 10,
              }}
            >
              <Grid
                // item={true}
                item={true}
                xs={12}
                md={6}
                style={{
                  padding: 10,
                }}
              >
                {Platform.OS === "web" ? <FileList fileType="file" /> : null}
              </Grid>

              <Grid
                // item={true}
                item={true}
                xs={12}
                md={6}
                style={{
                  padding: 10,
                }}
              >
                {Platform.OS === "web" ? <FileList fileType="misc" /> : null}
              </Grid>
            </Grid>
          </Grid>
        </PaperProvider>
      </Provider>
    </Grid>
  );
}
