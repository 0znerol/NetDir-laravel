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
  const [displayedVideo, setDisplayedVideo] = useState(0);
  useEffect(() => {
    if (files.length === 0) {
      dispatch(fetchFilesDb());
    }
  }, []);
  if (files.length > 0) {
    let videoFiles = files.filter((file) => file.category.includes("video"));

    // console.log(videoFiles);
    if (videoFiles.length > 0) {
      return (
        <Grid container style={{ height: "100%", alignItems: "center" }}>
          <Grid container>
            <Grid item xs={1}>
              <Grid
                style={{
                  display: "flex",
                  backgroundColor: border,
                  justifyContent: "center",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  height: "100%",
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
                    setDisplayedVideo(
                      (prevDisplayedVideo) =>
                        (prevDisplayedVideo - 1 + videoFiles.length) %
                        videoFiles.length
                    );
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
                alignItems: "center",
                display: "flex",
              }}
            >
              <video
                width="100%"
                controls
                allowFullScreen
                src={`http://192.168.1.95:8000/storage/app/public/user_${localStorage.getItem(
                  "user_id"
                )}/${videoFiles[displayedVideo].file_location}/${
                  videoFiles[displayedVideo].file_name
                }`}
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
                    setDisplayedVideo(
                      (prevDisplayedVideo) =>
                        (prevDisplayedVideo + 1) % videoFiles.length
                    );
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
