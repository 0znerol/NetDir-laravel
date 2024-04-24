import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Card } from "react-native-paper";
import { Platform } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PaperProvider, DarkTheme, DefaultTheme } from "react-native-paper";
import store from "../redux/store";
import Chart from "../src/Components/Chart";
import TotalFiles from "../src/Components/TotalFiles";
import UploadFile from "../src/Components/UploadFile";
import FileList from "../src/Components/FileList";
import { background, border } from "../src/variables/Colors";
import { fetchFilesDb } from "../redux/slices/FileSlice";
export default function HomeScreen() {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.allFiles.value);
  useEffect(() => {
    if (files.length === 0) dispatch(fetchFilesDb());
  }, []);
  // const [darkTheme, setDarkTheme] = useState(true);
  return (
    <Grid
      container
      style={{
        paddingTop: 75,
        // paddingLeft: 10,
        // paddingRight: 10,
        minHeight: "100vh",
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
                justifyContent: "space-between",
                // width: "100%",
                // padding: 10,
              }}
            >
              {files.some((file) => file.category === "image") && (
                <Grid
                  item={true}
                  // container
                  xs={12}
                  md={6}
                  style={{
                    padding: 10,
                  }}
                >
                  <FileList fileType="image" />
                </Grid>
              )}
              {files.some((file) => file.category === "video") && (
                <Grid
                  // item={true}
                  item={true}
                  xs={12}
                  md={6}
                  style={{
                    padding: 10,
                  }}
                >
                  <FileList fileType="video" />
                </Grid>
              )}
              {/* </Grid> */}

              {/* <Grid
              container
              style={{
                justifyContent: "space-around",
                // width: "100%",
                // padding: 10,
              }}
            > */}
              {files.some((file) => file.category === "text") && (
                <Grid
                  // item={true}
                  item={true}
                  xs={12}
                  md={6}
                  style={{
                    padding: 10,
                  }}
                >
                  <FileList fileType="text" />
                </Grid>
              )}
              {files.some((file) => file.category === "audio") && (
                <Grid
                  // item={true}
                  item={true}
                  xs={12}
                  md={6}
                  style={{
                    padding: 10,
                  }}
                >
                  <FileList fileType={"audio"} />
                </Grid>
              )}
              {/* </Grid> */}

              {/* <Grid
              container
              style={{
                justifyContent: "space-around",
                // width: "100%",
                // padding: 10,
              }}
            > */}

              {files.some((file) => file.category === "file") && (
                <Grid
                  // item={true}
                  item={true}
                  xs={12}
                  md={6}
                  style={{
                    padding: 10,
                  }}
                >
                  <FileList fileType="file" />
                </Grid>
              )}
              {files.some((file) => file.category === "misc") && (
                <Grid
                  // item={true}
                  item={true}
                  xs={12}
                  md={6}
                  style={{
                    padding: 10,
                  }}
                >
                  <FileList fileType="misc" />
                </Grid>
              )}
            </Grid>
          </Grid>
        </PaperProvider>
      </Provider>
    </Grid>
  );
}
