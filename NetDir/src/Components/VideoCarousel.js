import { Grid } from "@mui/material";
import React from "react";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { accent, border, background, nDark } from "../variables/Colors";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFilesDb } from "../../redux/slices/FileSlice";
import { Text } from "react-native";

export default function VideoCarousel() {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.allFiles.value);
  const [displayedVideo, setDisplayedVideo] = useState(() => {
    if (localStorage.getItem("displayedVideo")) {
      return parseInt(localStorage.getItem("displayedVideo"));
    }
    return 0;
  });
  // useEffect(() => {
  //   if (files.length === 0) {
  //     dispatch(fetchFilesDb());
  //   }
  // }, []);
  if (files.length > 0) {
    let videoFiles = files.filter((file) => file.category.includes("video"));
    const handleVideoScroll = (isPlus) => {
      if (isPlus) {
        localStorage.setItem(
          "displayedVideo",
          (displayedVideo + 1) % videoFiles.length
        );
        setDisplayedVideo(
          (prevDisplayedVideo) => (prevDisplayedVideo + 1) % videoFiles.length
        );
      } else {
        localStorage.setItem(
          "displayedVideo",
          (displayedVideo - 1 + videoFiles.length) % videoFiles.length
        );
        setDisplayedVideo(
          (prevDisplayedVideo) =>
            (prevDisplayedVideo - 1 + videoFiles.length) % videoFiles.length
        );
      }
    };
    // console.log(videoFiles);
    if (videoFiles.length > 0) {
      return (
        <Grid
          container
          style={{
            height: "100%",
            minHeight: "300px",
            alignItems: "start",
            textAlign: "right",
            justifyContent: "right",
            overflow: "hidden",
          }}
        >
          <Text style={{ color: "white" }}>
            {displayedVideo + 1}/{videoFiles.length}
          </Text>
          <Grid
            container
            style={{
              height: "100%",
            }}
          >
            <Grid item xs={1}>
              <Grid
                style={{
                  display: "flex",
                  backgroundColor: border,
                  // justifyContent: "center",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  style={{
                    transform: "rotate(180deg)",
                    color: accent,
                    width: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    handleVideoScroll(false);
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              item
              xs={10}
              style={{
                justifyContent: "center",
                // alignItems: "center",
                display: "flex",
                height: "100%",
              }}
            >
              <video
                width="100%"
                height="100%"
                controls
                allowFullScreen
                src={`http://192.168.1.95:8000/api/show/${videoFiles[displayedVideo].id}`}
              >
                {videoFiles.length > 0 && <source type="video/mp4" />}
              </video>
            </Grid>
            <Grid item xs={1}>
              <Grid
                style={{
                  display: "flex",
                  backgroundColor: border,
                  justifyContent: "center",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  height: "100%",
                }}
              >
                <IconButton
                  style={{
                    color: accent,
                    width: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    handleVideoScroll(true);
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: "1.5em", color: "lightgrey" }}>
            No Videos Found
          </Text>
        </Grid>
      );
    }
  }
}
