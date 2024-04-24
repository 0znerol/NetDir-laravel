import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { accent, border, background, nDark } from "../variables/Colors";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Text } from "react-native-paper";
import { host } from "../variables/Network";

export default function ImageCarousel() {
  const files = useSelector((state) => state.allFiles.value);
  const [displayedImage, setDisplayedImage] = useState(() => {
    if (localStorage.getItem("displayedImage")) {
      return parseInt(localStorage.getItem("displayedImage"));
    }
    return 0;
  });
  // const [loadedImages, setLoadedImages] = useState([]);
  // const observerRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           loadImage(entry.target.dataset.index);
  //         }
  //       });
  //     },
  //     {
  //       rootMargin: "200px",
  //     }
  //   );

  //   observerRef.current = observer;

  //   return () => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect();
  //     }
  //   };
  // }, []);

  // const loadImage = (index) => {
  //   if (!loadedImages.includes(parseInt(index))) {
  //     setLoadedImages((prevLoadedImages) => [
  //       ...prevLoadedImages,
  //       parseInt(index),
  //     ]);
  //   }
  // };

  if (files.length > 0) {
    let imageFiles = files.filter((file) => file.category.includes("image"));
    const handleImageChange = (isPlus) => {
      if (isPlus) {
        localStorage.setItem(
          "displayedImage",
          (displayedImage + 1) % imageFiles.length
        );
        setDisplayedImage(
          (prevDisplayedImage) => (prevDisplayedImage + 1) % imageFiles.length
        );
      } else {
        localStorage.setItem(
          "displayedImage",
          (displayedImage - 1 + imageFiles.length) % imageFiles.length
        );
        setDisplayedImage(
          (prevDisplayedImage) =>
            (prevDisplayedImage - 1 + imageFiles.length) % imageFiles.length
        );
      }
    };
    if (imageFiles.length > 0) {
      return (
        <Grid
          container
          style={{
            // height: "fit-content",
            alignItems: "start",
            minHeight: "300px",
          }}
        >
          <Text style={{}}>
            {displayedImage + 1}/{imageFiles.length}
          </Text>
          <Grid
            container
            style={
              {
                // height: "fit-content",
                // alignItems: "start",
                // minHeight: "300px",
              }
            }
          >
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
                    color: accent,
                    transform: "rotate(180deg)",
                    width: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    handleImageChange(false);
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
                width: "100%",
              }}
            >
              {imageFiles.map((file, index) => (
                <a
                  key={index}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: index === displayedImage ? "block" : "none",
                  }}
                  href={
                    index === displayedImage
                      ? `http://${host}:8000/api/show/${file.id}`
                      : null
                  }
                >
                  <img
                    key={index}
                    src={
                      index === displayedImage
                        ? `http://${host}:8000/api/show/${file.id}`
                        : null
                    }
                    alt="Loading..."
                    style={{
                      width: "inherit",
                      height: "100%",
                      objectFit: "cover",
                      // opacity: loadedImages.includes(index) ? 1 : 0,
                      transition: "opacity 0.5s",
                      position:
                        index === displayedImage ? "static" : "absolute",
                      zIndex: index === displayedImage ? 1 : 0,
                      // left: index === displayedImage ? 0 : 10000000,
                      // left: 0,
                      display: index === displayedImage ? "block" : "none",
                    }}
                    data-index={index}
                    // ref={(el) => {
                    //   if (el && !loadedImages.includes(index)) {
                    //     observerRef.current.observe(el);
                    //   }
                    // }}
                  />
                </a>
              ))}
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
                    width: "100%",
                    borderRadius: 0,
                    color: accent,
                  }}
                  onClick={() => {
                    handleImageChange(true);
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
            No Images Found
          </Text>
        </Grid>
      );
    }
  }
}
