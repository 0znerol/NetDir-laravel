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

  // useEffect(() => {
  //   const currentPage = location.pathname;

  //   if (currentPage === "Home" || currentPage === "Folders") {
  //     localStorage.removeItem("displayedImage");
  //     localStorage.removeItem("displayedVideo");
  //   }
  // }, [location.pathname]);

  const handleLogout = async () => {
    try {
      if (localStorage.getItem("logged_user")) {
        // await axios.get("/sanctum/csrf-cookie");
        localStorage.removeItem("logged_user");
        localStorage.removeItem("displayedVideo");
        localStorage.removeItem("displayedImage");
        await axios.post("/logout");
      }
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
          zIndex: 1000,
          paddingLeft: 10,
          paddingRight: 5,
          paddingTop: 0,
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
              {localStorage.getItem("logged_user") ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: "lightgray",
                  }}
                >
                  User: {JSON.parse(localStorage.getItem("logged_user")).name}
                </Text>
              ) : null}
              <Pressable
                style={{
                  textAlign: "center",
                  padding: 5,
                }}
                onPress={handleLogout}
              >
                {localStorage.getItem("logged_user") ? (
                  <Appbar.Content title="Logout" />
                ) : (
                  <Appbar.Content title="Login" />
                )}
              </Pressable>
            </Grid>
          ))
        : (setTimeout(() => {
            document.querySelector(".dotsMenu").style.top = "-2px";
          }, 100),
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
              {localStorage.getItem("logged_user") ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: "lightgray",
                  }}
                >
                  User: {JSON.parse(localStorage.getItem("logged_user")).name}
                </Text>
              ) : null}
              <Pressable
                style={{
                  textAlign: "center",
                  padding: 5,
                }}
                onPress={handleLogout}
              >
                {localStorage.getItem("logged_user") ? (
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
