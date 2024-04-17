import React from "react";
import { Appbar } from "react-native-paper";
import { Pressable, StatusBar, Text } from "react-native";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/slices/FileSlice";
import { background, nDark, accent, border } from "../variables/Colors";
import { useState, useEffect } from "react";
import Search from "./Search";
import axios from "../api/axios";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/Search";
  const isGalleryPage = location.pathname === "/Gallery";
  const files = useSelector((state) => state.allFiles.value);
  const [openDots, setOpenDots] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInputWidth, setSearchInputWidth] = useState(0);
  const [searchInputOpacity, setSearchInputOpacity] = useState(0);

  const handleClick = () => {
    if (isSearchPage) {
      navigate("/Home");
      setSearchInputWidth(0);
      setSearchInputOpacity(0);
      setTimeout(() => {
        setShowSearchBar(false);
      }, 500);
    } else {
      navigate("/Search");
      setShowSearchBar(true);
      setTimeout(() => {
        setSearchInputWidth(20);
        setSearchInputOpacity(1);
      }, 100);
    }
  };

  useEffect(() => {
    let timer;
    if (showSearchBar) {
      timer = setTimeout(() => {
        setSearchInputWidth(20);
        setSearchInputOpacity(1);
      }, 100);
    } else {
      timer = setTimeout(() => {
        setSearchInputWidth(0);
        setSearchInputOpacity(0);
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [showSearchBar]);

  useEffect(() => {
    if (isSearchPage) {
      setShowSearchBar(true);
      setSearchInputWidth(20);
      setSearchInputOpacity(1);
    } else {
      setSearchInputWidth(0);
      setSearchInputOpacity(0);
      setTimeout(() => {
        setShowSearchBar(false);
      }, 500);
    }
  }, [isSearchPage]);

  useEffect(() => {
    if (!isGalleryPage) {
      localStorage.removeItem("displayedImage");
      localStorage.removeItem("displayedVideo");
    }
  });

  const handleLogout = async () => {
    try {
      // Clear the cookies on the server
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/logout");

      // Clear the local storage
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_name");
      // Navigate to the login page
      navigate("/");
      setOpenDots(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <Grid
      conteiner="true"
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "100vw",
        justifyContent: "center",
      }}
    >
      <Grid
        item="true"
        xs={12}
        style={{
          position: "fixed",
          // top: -10,
          // float: "left",
          zIndex: 1000,
          padding: 10,
          paddingTop: 0,
          // marginLeft: "1rem",
          // borderRadius: 50,
        }}
      >
        <StatusBar style="auto" />
        <Appbar
          style={{
            borderRadius: 10,
          }}
        >
          <Appbar.Content
            title="NetDir"
            onPress={() => {
              navigate("/Home");
              setSearchInputWidth(0);
              setSearchInputOpacity(0);
              setTimeout(() => {
                setShowSearchBar(false);
              }, 500);
            }}
          />
          <input
            type="text"
            id="searchInput"
            style={{
              width: `${searchInputWidth}%`,
              height: "3vh",
              fontSize: "1em",
              marginBottom: 10,
              backgroundColor: border,
              opacity: searchInputOpacity,
              border: "3px solid " + nDark,
              borderRadius: 5,
              color: "white",
              transition: "0.4s ease-in-out",
              margin: "auto",
              display: showSearchBar ? "block" : "none",
            }}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
          />
          {/* <Appbar.Content
            title="Logout"
            onPress={() => {
              localStorage.removeItem("user_id");
              navigate("/");
            }}
          /> */}
          <Appbar.Action icon="magnify" onPress={handleClick} />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => {
              setOpenDots(!openDots);
            }}
          />

          {/* <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} /> */}
        </Appbar>
      </Grid>
      {openDots
        ? (setTimeout(() => {
            document.querySelector(".dotsMenu").style.top = "62px";
          }, 200),
          (
            <Grid
              item="true"
              className="dotsMenu"
              xs={12}
              style={{
                width: "fit-content",
                position: "absolute",
                transition: "0.5s",
                textAlign: "center",
                top: -2,
                right: 20,
                backgroundColor: nDark,
                border: "2px solid " + border,
                borderRadius: 5,
                zIndex: 500,
              }}
            >
              {localStorage.getItem("user_id") ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: "lightgray",
                  }}
                >
                  User: {localStorage.getItem("user_name")}
                </Text>
              ) : null}
              <Pressable
                style={{
                  textAlign: "center",
                  padding: 5,
                }}
                onPress={handleLogout}
              >
                {localStorage.getItem("user_id") ? (
                  <Appbar.Content title="Logout" />
                ) : (
                  <Appbar.Content title="Login" />
                )}
              </Pressable>
            </Grid>
          ))
        : (setTimeout(() => {
            document.querySelector(".dotsMenu").style.top = "-2px";
          }, 1),
          (
            <Grid
              item="true"
              className="dotsMenu"
              xs={12}
              style={{
                width: "fit-content",
                position: "absolute",
                transition: "0.5s",
                textAlign: "center",
                top: 62,
                right: 20,
                backgroundColor: nDark,
                border: "2px solid " + border,
                borderRadius: 5,
                zIndex: 500,
              }}
            >
              {localStorage.getItem("user_id") ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: "lightgray",
                  }}
                >
                  User: {localStorage.getItem("user_name")}
                </Text>
              ) : null}
              <Pressable
                style={{
                  textAlign: "center",
                  padding: 5,
                }}
                onPress={handleLogout}
              >
                {localStorage.getItem("user_id") ? (
                  <Appbar.Content title="Logout" />
                ) : (
                  <Appbar.Content title="Login" />
                )}
              </Pressable>
            </Grid>
          ))}
    </Grid>
  );
}
