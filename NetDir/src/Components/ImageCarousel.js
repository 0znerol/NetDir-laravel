import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { accent, border, background, nDark } from "../variables/Colors";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Text } from "react-native-paper";

export default function ImageCarousel() {
  const files = useSelector((state) => state.allFiles.value);
  const [displayedImage, setDisplayedImage] = useState(0);
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

  const handleImageChange = (newIndex) => {
    setDisplayedImage(newIndex);
  };

  if (files.length > 0) {
    let imageFiles = files.filter((file) => file.category.includes("image"));

    if (imageFiles.length > 0) {
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
                    color: accent,
                    transform: "rotate(180deg)",
                    width: "100%",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    handleImageChange(
                      (prevDisplayedImage) =>
                        (prevDisplayedImage - 1 + imageFiles.length) %
                        imageFiles.length
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
                      ? `http://192.168.1.95:8000/storage/app/public/user_${localStorage.getItem(
                          "user_id"
                        )}/${file.file_location}/${file.file_name}`
                      : null
                  }
                >
                  <img
                    key={index}
                    src={
                      index === displayedImage
                        ? `http://192.168.1.95:8000/storage/app/public/user_${localStorage.getItem(
                            "user_id"
                          )}/${file.file_location}/${file.file_name}`
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
                    handleImageChange(
                      (prevDisplayedImage) =>
                        (prevDisplayedImage + 1) % imageFiles.length
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
            No Images Found
          </Text>
        </Grid>
      );
    }
  }
}
