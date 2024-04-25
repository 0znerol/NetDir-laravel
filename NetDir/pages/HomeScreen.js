import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { Card } from "react-native-paper";
import { Animated, Platform } from "react-native";
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
  const translateLeft = useRef(new Animated.Value(0)).current;
  const translateRight = useRef(new Animated.Value(0)).current;
  const translateOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (files.length === 0) dispatch(fetchFilesDb());
  }, []);

  useEffect(() => {
    Animated.timing(translateLeft, {
      toValue: -20,
      duration: 1000, // duration of the animation in milliseconds
      useNativeDriver: true, // use native driver for better performance
    }).start();
    Animated.timing(translateRight, {
      toValue: 20,
      duration: 1000, // duration of the animation in milliseconds
      useNativeDriver: true, // use native driver for better performance
    }).start();
    Animated.timing(translateOpacity, {
      toValue: 1,
      duration: 1500, // duration of the animation in milliseconds
      useNativeDriver: true, // use native driver for better performance
    }).start();
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
              <Grid item={true} xs={12} md={8} lg={6}>
                {Platform.OS === "web" ? (
                  <Card
                    style={{
                      borderRadius: 4,
                      borderWidth: 3,
                      borderColor: border,
                      margin: 10,
                      // backgroundColor: background,
                      right: 20,
                      opacity: translateOpacity,
                      transform: [{ translateX: translateRight }],
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
                md={4}
                lg={6}
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
                        // backgroundColor: background,
                        right: -20,
                        opacity: translateOpacity,
                        transform: [{ translateX: translateLeft }],
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
                        // backgroundColor: background,
                        right: -20,
                        opacity: translateOpacity,
                        transform: [{ translateX: translateLeft }],
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
                    position: "relative",
                  }}
                >
                  <Card
                    style={{
                      // backgroundColor: background,
                      borderRadius: 4,
                      border: "3px solid " + border,
                      opacity: translateOpacity,
                      right: 20,
                      transform: [{ translateX: translateRight }],
                      paddingHorizontal: 10,
                    }}
                  >
                    <FileList fileType="image" />
                  </Card>
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
                  <Card
                    style={{
                      opacity: translateOpacity,
                      right: -20,
                      transform: [{ translateX: translateLeft }],
                      borderRadius: 4,
                      border: "3px solid " + border,
                      paddingHorizontal: 10,
                    }}
                  >
                    <FileList fileType="video" />
                  </Card>
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
                  <Card
                    style={{
                      opacity: translateOpacity,
                      right: 20,
                      transform: [{ translateX: translateRight }],
                      borderRadius: 4,
                      border: "3px solid " + border,
                      paddingHorizontal: 10,
                    }}
                  >
                    <FileList fileType="text" />
                  </Card>
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
                  <Card
                    style={{
                      opacity: translateOpacity,
                      right: -20,
                      transform: [{ translateX: translateLeft }],
                      borderRadius: 4,
                      border: "3px solid " + border,
                      paddingHorizontal: 10,
                    }}
                  >
                    <FileList fileType={"audio"} />
                  </Card>
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
                  <Card
                    style={{
                      opacity: translateOpacity,
                      right: 20,
                      transform: [{ translateX: translateRight }],
                      borderRadius: 4,
                      border: "3px solid " + border,
                      paddingHorizontal: 10,
                    }}
                  >
                    <FileList fileType="file" />
                  </Card>
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
                  <Card
                    style={{
                      opacity: translateOpacity,
                      right: -20,
                      transform: [{ translateX: translateLeft }],
                      borderRadius: 4,
                      border: "3px solid " + border,
                      paddingHorizontal: 10,
                    }}
                  >
                    <FileList fileType="misc" />
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>
        </PaperProvider>
      </Provider>
    </Grid>
  );
}
