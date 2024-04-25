import React, { useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { Card } from "react-native-paper";
import { Animated, Text } from "react-native";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { accent, border, background, nDark } from "../src/variables/Colors";
import ImageCarousel from "../src/Components/ImageCarousel";
import VideoCarousel from "../src/Components/VideoCarousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesDb } from "../redux/slices/FileSlice";
// import { makeStyles } from "@mui/styles";

export default function GalleryScreen() {
  const dispatch = useDispatch();
  const [enlargeR, setEnlargeR] = useState(false);
  const [enlargeL, setEnlargeL] = useState(false);
  const [showComponentL, setShowComponentL] = useState(true);
  const [showComponentR, setShowComponentR] = useState(true);
  const [bpLeft, setBpLeft] = useState(6);
  const [bpRight, setBpRight] = useState(6);

  const [opacityL, setOpacityL] = useState(1);
  const [opacityR, setOpacityR] = useState(1);
  const files = useSelector((state) => state.allFiles.value);

  // console.log(window.innerWidth);
  const DisplayNoneTime = 190;
  const GridTransitionTime = 40; // *6 = 240ms

  const translateLeft = useRef(new Animated.Value(0)).current;
  const translateRight = useRef(new Animated.Value(0)).current;
  const translateOpacity = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    if (enlargeL) {
      setOpacityR(0);
      setShowComponentL(true);
      setOpacityL(1);
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          setBpLeft((prev) => prev + 1);
          setBpRight((prev) => prev - 1);
        }, i * GridTransitionTime);
        console.log(bpLeft, " ", bpRight);
      }
    } else if (enlargeR) {
      setOpacityL(0);
      setShowComponentR(true);
      setOpacityR(1);
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          setBpLeft((prev) => prev - 1);
          setBpRight((prev) => prev + 1);
        }, i * GridTransitionTime);
        console.log(bpLeft, " ", bpRight);
      }
    } else if (!enlargeL && !enlargeR) {
      for (let i = 0; i < 6; i++) {
        if (bpLeft > 6) {
          setTimeout(() => {
            setBpLeft((prev) => prev - 1);
            setBpRight((prev) => prev + 1);
          }, i * GridTransitionTime);
        } else if (bpLeft < 6) {
          setTimeout(() => {
            setBpLeft((prev) => prev + 1);
            setBpRight((prev) => prev - 1);
          }, i * GridTransitionTime);
        } else if (bpLeft === 6 && bpRight === 6) {
          setTimeout(() => {
            setBpLeft(6);
            setBpRight(6);
          }, i * GridTransitionTime);
        }
        console.log(bpLeft, " ", bpRight);
      }
      setShowComponentL(true);
      setShowComponentR(true);

      setOpacityL(1);
      setOpacityR(1);
    }
  }, [enlargeL, enlargeR]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (opacityR === 0 && opacityL === 0) {
        setShowComponentL(false);
        setShowComponentR(false);
      } else if (opacityR === 1 && opacityL === 1) {
        setShowComponentL(true);
        setShowComponentR(true);
      } else if (opacityL === 1 && opacityR === 0) {
        setShowComponentL(true);
        setShowComponentR(false);
      } else if (opacityR === 1 && opacityL === 0) {
        setShowComponentR(true);
        setShowComponentL(false);
      }
    }, DisplayNoneTime);

    return () => clearTimeout(timeout);
  }, [opacityR, opacityL]);

  useEffect(() => {
    dispatch(fetchFilesDb());
  }, []);
  return (
    <Grid
      container
      style={{ marginTop: 0, height: "110vh", padding: 10, paddingTop: 75 }}
    >
      <Grid
        item
        md={bpLeft}
        //md={enlargeR ? 0 : !enlargeL && !enlargeR ? 6 : enlargeL ? 12 : 6}
        style={{
          display: showComponentL ? "block" : "none",
          opacity: opacityL,
          transition: "opacity 0.2s ease-in-out",
          maxHeight: "90vh",
          //width: window.innerWidth > '500' ? "50%" : "100%"
        }}
        //        ref={(el) => {
        //          if (el) {
        // el.attributes[2] = "md";
        //            console.log(el.attributes);

        //            if (el && enlargeR) {
        //              el.style.width = "10%";
        //              el.style.opacity = 0;
        //              setTimeout(() => {
        //                el.style.display = "none";
        //              }, 1200);

        //            }else if (!enlargeR && enlargeL){
        //              setTimeout(() =>{
        //                el.style.transitionDuration = "2.0s";
        //                el.style.width = "100%";
        //              },20)

        //            } else if (!enlargeR) {
        //              setTimeout(() => {

        //                if(window.innerWidth > 900){
        //                  el.style.width = "50%";
        //                }else{
        //                  el.style.width = "100%";
        //                }

        //                el.style.opacity = 1;
        //              }, 10);

        //          }
        //        }}}
      >
        <Card
          style={{
            borderRadius: 4,
            borderWidth: 3,
            borderColor: border,
            margin: 10,
            height: "fit-content",
            alignSelf: "center",
            zIndex: 2,
            maxHeight: "90vh",
            right: 20,
            opacity: translateOpacity,
            transform: [{ translateX: translateRight }],
          }}
        >
          <Card.Content
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottom: "3px solid " + border,
            }}
          >
            <Text
              style={{
                // display: enlargeR ? "none" : "block",
                color: "lightgrey",
                fontSize: "20px",
                margin: 10,
                top: -5,
              }}
            >
              Images
            </Text>
            <IconButton
              style={{
                // display: enlargeR ? "none" : "block",
                color: enlargeL ? "red" : accent,
                transform: enlargeL ? "rotate(180deg)" : "rotate(0deg)",
                transitionDuration: "0.5s",
                transitionProperty: "color, transform",
                top: -10,
              }}
              onClick={() => {
                setEnlargeL((prevEnlargeL) => !prevEnlargeL);
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Card.Content>
          <Card.Content
            style={{
              padding: 15,
            }}
          >
            <ImageCarousel />
          </Card.Content>
        </Card>
      </Grid>
      <Grid
        item
        id="rightGrid"
        md={bpRight}
        //xs={12}
        //md={enlargeL ? 0 : !enlargeL && !enlargeR ? 6 : enlargeR ? 12 : 6}
        style={{
          display: showComponentR ? "block" : "none",
          opacity: opacityR,
          transition: "opacity 0.2s ease-in-out",
          //display: !enlargeL ? "block" : null,
          //width: window.innerWidth > 100 ? "50%" : "100%"
        }}
      >
        <Card
          style={{
            borderRadius: 4,
            borderWidth: 3,
            borderColor: border,
            margin: 10,
            height: "fit-content",
            right: -20,
            opacity: translateOpacity,
            transform: [{ translateX: translateLeft }],
          }}
        >
          <Card.Content
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              paddingTop: 11,
              paddingLeft: 11,
              paddingBottom: 5,
              borderBottom: "3px solid " + border,
            }}
          >
            <Text
              style={{
                // display: enlargeL ? "none" : "block",
                color: "lightgrey",
                fontSize: "20px",
                margin: 10,
              }}
            >
              Videos
            </Text>
            <IconButton
              style={{
                // display: enlargeL ? "none" : "block",
                color: enlargeR ? "red" : accent,
                transform: enlargeR ? "rotate(0deg)" : "rotate(-180deg)",
                transitionDuration: "0.5s",
                transitionProperty: "color, transform",
                top: enlargeR ? 0 : -5,
              }}
              onClick={() => {
                setEnlargeR((prevEnlargeR) => !prevEnlargeR);
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Card.Content>
          <Card.Content
            style={{
              padding: 15,
            }}
          >
            <VideoCarousel />
          </Card.Content>
        </Card>
      </Grid>
    </Grid>
  );
}
