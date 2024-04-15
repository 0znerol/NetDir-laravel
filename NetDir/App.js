import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from "react-native-paper";
import NotFoundScreen from "./pages/NotFoundScreen";

import store from "./redux/store";
import NavBar from "./src/Components/NavBar";
import HomeScreen from "./pages/HomeScreen";
import AccessScreen from "./pages/AccessScreen";
import FolderScreen from "./pages/FolderScreen";
import GalleryScreen from "./pages/GalleryScreen";
import Search from "./src/Components/Search";
import FloatingDot from "./src/Components/FloatingDot";
import { background } from "./src/variables/Colors";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  document.querySelector("html").style.overflowY = "hidden";
  const toggleTheme = () => setDarkTheme(!darkTheme);

  return (
    <Provider
      store={store}
      style={{
        backgroundColor: background,
        padding: 0,
        height: "100%",
        display: "flex",
      }}
    >
      <PaperProvider
        theme={DarkTheme}
        style={{
          backgroundColor: background,
          height: "100vh",
          display: "flex",
        }}
      >
        <Grid
          container="true"
          spacing={3}
          style={{
            backgroundColor: background,
            // overglowY: "scroll",
            overflowY: "scroll",
            display: "flex",
          }}
        >
          <BrowserRouter style={{}}>
            <Grid container="true" style={{ padding: 10, width: "100%" }}>
              <Grid xs={12} style={{ width: "100%" }}>
                <NavBar />
              </Grid>
              <Grid
                item="true"
                xs={12}
                style={{
                  display: "flex",
                  // paddingTop: 70,
                  justifyContent: "center",
                  // alignSelf: "center",
                  // alignContent: "center",
                  width: "100%",
                }}
              >
                <Routes>
                  <Route
                    path="/Home"
                    element={
                      <Grid item="true" xs={11} style={{}}>
                        <HomeScreen />
                      </Grid>
                    }
                  />
                  <Route path="/" element={<AccessScreen />} />
                  <Route path="/Search" element={<Search />} />
                  <Route path="/Folders" element={<FolderScreen />} />
                  <Route path="/GalleryScreen" element={<GalleryScreen />} />
                  <Route path="*" element={<NotFoundScreen />} />
                </Routes>
                <FloatingDot />
              </Grid>
            </Grid>
          </BrowserRouter>
        </Grid>
      </PaperProvider>
    </Provider>
  );
}
