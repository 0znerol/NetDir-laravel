import React, { useState, useEffect, useRef } from "react";
import { Text, Pressable, Dimensions, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesDb, deleteFile } from "../../redux/slices/FileSlice";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { border, accent, nDark, background } from "../variables/Colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import axios from "../api/axios";
import { host } from "../variables/Network";
import { Card, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScaleIcon from "@mui/icons-material/Scale";

function FileList({ fileType, sort = "name" }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const windowWidth = Dimensions.get("window").width;
  const searchFile = useSelector((state) => state.allFiles.search);
  const files = useSelector((state) => state.allFiles.value);
  const [sizeModal, setSizeModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [modOpen, setModOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modId, setModId] = useState(0);

  const [infoId, setInfoId] = useState(null);

  const translateLeft = useRef(new Animated.Value(0)).current;
  const translateRight = useRef(new Animated.Value(0)).current;
  const translateOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(translateLeft, {
        toValue: -20,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateRight, {
        toValue: 20,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  // useEffect(() => {
  //   dispatch(fetchFilesDb());
  //   console.log(search);
  // }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const handleNameUpdate = async (file_name, id) => {
    if (id) {
      const formData = new FormData();
      formData.append("file_name", fileName || file_name);
      // await axios.get("/sanctum/csrf-cookie");
      try {
        const response = await axios.post(
          `${host}/api/updateFile/${id}`,
          formData,
          {
            headers: { "Content-type": "multipart/form-data" },
          }
        );
        console.log(response.data);
        dispatch(fetchFilesDb());
        saveIconResponse();
      } catch (error) {
        console.error("Error uploading file:", error);
        saveIconResponse("red");
      }
    }
  };

  const saveIconResponse = (color = "green") => {
    const saveIcon = document.querySelectorAll(".saveIcon");
    saveIcon.forEach((icon) => {
      if (icon.id == modId) {
        icon.style.transition = "color 1s";
        icon.style.color = color;
        setTimeout(() => {
          icon.style.transition = "color 0.5s";
          icon.style.color = accent;
        }, 1000);
      }
    });
  };

  useEffect(() => {
    if (files.length === 0) dispatch(fetchFilesDb());
    setSearch(searchFile);
  }, [searchFile, dispatch]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  switch (fileType) {
    case "/":
      return renderSearchFiles(
        search,
        files,
        sort,
        formatBytes,
        isSmallScreen,
        sizeModal,
        setSizeModal,
        dateModal,
        setDateModal,
        infoId,
        setInfoId
      );
    default:
      return renderCategoryFiles(
        files,
        fileType,
        dispatch,
        deleteFile,
        modOpen,
        modId,
        handleNameUpdate,
        setModOpen,
        setModId,
        fileName,
        setFileName,
        formatBytes,
        windowWidth,
        translateLeft,
        translateRight,
        translateOpacity
      );
  }
}

const renderSearchFiles = (
  search,
  files,
  sort,
  formatBytes,
  isSmallScreen,
  sizeModal,
  setSizeModal,
  dateModal,
  setDateModal,
  infoId,
  setInfoId
) => {
  const sortedFiles = [...files].sort((a, b) => {
    switch (sort) {
      case "dateAsc":
        return new Date(a.created_at) - new Date(b.created_at);
      case "dateDes":
        return new Date(b.created_at) - new Date(a.created_at);
      case "name":
        return b.file_name.localeCompare(a.file_name);
      case "largest":
        return b.file_size - a.file_size;
      case "smallest":
        return a.file_size - b.file_size;
      default:
        return 0;
    }
  });

  return (
    <Grid key={7} style={{ height: "100vh", paddingTop: 10, width: "100%" }}>
      {sortedFiles.map((file, index) => {
        if (
          search.toLowerCase() === "" ||
          file.file_name.toLowerCase().includes(search.toLowerCase())
        ) {
          console.log(file.created_at);
          return (
            <Grid
              container
              key={index}
              style={{
                borderBottom: "2px solid" + border,
                padding: 10,
              }}
            >
              <Grid
                item="true"
                xs={2}
                style={{ textAlign: "center", alignSelf: "center" }}
              >
                {isSmallScreen ? (
                  <>
                    <CalendarMonthIcon
                      style={{
                        color: "lightgray",
                        fontSize: "1.5em",
                        margin: "auto",
                        padding: 5,
                        border: "2px solid" + accent,
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSizeModal(false);

                        if (file.id === infoId) {
                          setDateModal(!dateModal);
                        } else {
                          setDateModal(true);
                          setInfoId(file.id);
                        }
                      }}
                    />
                  </>
                ) : (
                  <Text
                    style={{
                      color: "lightgray",
                      fontSize: "1em",
                      margin: "auto",
                    }}
                  >
                    {file.created_at.slice(0, 10) +
                      " " +
                      file.created_at.slice(11, 19)}
                  </Text>
                )}
                {dateModal && file.id === infoId ? (
                  <Grid
                    container
                    style={{
                      position: "absolute",
                      backgroundColor: nDark,
                      border: "2px solid " + accent,
                      borderRadius: 5,
                      zIndex: 100,
                    }}
                  >
                    <Text style={{ color: "lightgrey", padding: 5 }}>
                      {file.created_at.slice(0, 10) +
                        " " +
                        file.created_at.slice(11, 19)}
                    </Text>
                  </Grid>
                ) : null}
              </Grid>
              <Grid
                item="true"
                xs={8}
                style={{ textAlign: "center", alignContent: "center" }}
              >
                <a
                  href={`http://${host}:8000/api/show/${file.id}`}
                  target="_blank"
                  style={{
                    textDecorationColor: accent,
                    textDecorationThickness: 3,
                    textDecorationLine: "underline",
                    margin: "auto",
                    alignContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "lightgray",
                      fontSize: "1.5em",
                      // align: "center",
                      margin: "auto",
                      // padding: 30,
                    }}
                  >
                    {file.file_name}
                  </Text>
                </a>
              </Grid>
              <Grid
                item="true"
                xs={2}
                style={{ textAlign: "center", alignContent: "center" }}
              >
                {isSmallScreen ? (
                  <ScaleIcon
                    style={{
                      color: "lightgray",
                      fontSize: "1.5em",
                      margin: "auto",
                      padding: 5,
                      border: "2px solid" + accent,
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setDateModal(false);
                      if (file.id === infoId) {
                        setSizeModal(!sizeModal);
                      } else {
                        setSizeModal(true);
                        setInfoId(file.id);
                      }
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: "lightgray",
                      fontSize: "1em",
                      // align: "center",
                      margin: "auto",
                      // padding: 30,
                    }}
                  >
                    {formatBytes(file.file_size)}
                  </Text>
                )}
                {sizeModal && file.id === infoId ? (
                  <Grid
                    container
                    style={{
                      position: "absolute",
                      backgroundColor: nDark,
                      border: "2px solid " + accent,
                      borderRadius: 5,
                      zIndex: 100,
                    }}
                  >
                    <Text style={{ color: "lightgrey", padding: 5 }}>
                      {formatBytes(file.file_size)}
                    </Text>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          );
        }
        return null;
      })}
    </Grid>
  );
};

const renderCategoryFiles = (
  files,
  fileType,
  dispatch,
  deleteFile,
  modOpen,
  modId,
  handleNameUpdate,
  setModOpen,
  setModId,
  fileName,
  setFileName,
  formatBytes,
  translateLeft,
  translateRight,
  translateOpacity
) =>
  files.filter((file) => file.category === fileType).length > 0 ? (
    <ul
      style={{
        padding: 0,
        height: "100%",
      }}
    >
      <Grid
        style={{
          justifyContent: "center",
          // borderRadius: 4,
          // borderWidth: 3,
          // borderColor: border,
          // borderStyle: "solid",
          // padding: 10,
          height: "100%",
          width: "100%",

          // margin: 5,
        }}
      >
        <Text style={{ color: "white", margin: "auto", fontSize: "1.5em" }}>
          {fileType}s
        </Text>
        {files
          .filter((file) => file.category === fileType)
          .map((file, index) => {
            return (
              <Card
                style={{
                  borderRadius: 4,
                  borderWidth: 3,
                  borderColor: border,
                  borderStyle: "solid",
                  margin: 5,
                  backgroundColor: background,
                  padding: 0,
                }}
                key={index}
              >
                {/* <Card.Content> */}

                <Grid
                  container
                  style={{
                    // display: "flex",
                    flexDirection: "row",
                    // borderBottom: "2px solid #808080",
                    padding: 0,
                  }}
                >
                  <Grid
                    xs={12}
                    style={{
                      padding: 0,
                      // paddingInline: 10,
                      width: "100%",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        listStyleType: "none",
                        // justifyContent: "center",
                        padding: 0,
                        // paddingInline: 10,

                        width: "100%",
                      }}
                    >
                      <Grid
                        container
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "center",
                          width: "100%",
                          padding: 0,
                        }}
                      >
                        <Grid
                          container
                          style={{
                            padding: 0,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            marginBottom: modOpen && file.id == modId ? 10 : 0,
                          }}
                        >
                          <Grid
                            xs={modOpen && file.id == modId ? 8 : 10}
                            md={modOpen && file.id == modId ? 8 : 10}
                            style={{ padding: 15 }}
                          >
                            <Grid
                              container
                              style={{
                                // textAlign: "center",
                                // top: -20,
                                overflowX:
                                  modOpen && modId === file.id
                                    ? null
                                    : "scroll",
                                width: "100%",
                              }}
                            >
                              <Pressable
                                onPress={() => {
                                  window.open(
                                    `http://${host}:8000/api/show/${file.id}`
                                  );
                                }}
                                style={{
                                  // width: "80%",
                                  display:
                                    modOpen && file.id == modId
                                      ? "none"
                                      : "block",
                                }}
                              >
                                <Text
                                  style={{
                                    textDecorationStyle: "solid",
                                    textDecorationLine: "underline",
                                    textDecorationColor: accent,
                                    color: "lightgray",
                                    fontSize: "1.5em",
                                    zIndex: -1,
                                    // margin: "auto",
                                  }}
                                >
                                  {file.file_name}
                                </Text>
                              </Pressable>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleNameUpdate(file.file_name, file.id);
                                }}
                                style={{
                                  display:
                                    modOpen && file.id == modId
                                      ? "block"
                                      : "none",

                                  width: "100%",
                                }}
                              >
                                <input
                                  type="text"
                                  value={fileName || file.file_name}
                                  style={{
                                    width: "100%",
                                    fontSize: "1.4em",
                                    backgroundColor: nDark,
                                    color: "lightgray",
                                    borderColor: nDark,
                                    borderWidth: 3,
                                    borderRadius: 5,
                                    borderStyle: "solid",
                                    zIndex: -1,
                                    userSelect: "none",
                                    outline: "none",
                                  }}
                                  name="file_name"
                                  onChange={(e) => {
                                    setFileName(e.target.value);
                                  }}
                                  onSelect={(e) => {
                                    e.target.style.borderColor = accent;
                                  }}
                                />
                              </form>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            xs={modOpen && file.id == modId ? 3 : 2}
                            // sm={modOpen ? 3 : 2}
                            md={modOpen && file.id == modId ? 3 : 1}
                            style={{
                              // flexDirection: "row",
                              // justifyContent: "space-between",
                              // margin: 1,
                              // marginTop: 5,
                              margin: " auto",
                            }}
                          >
                            {modOpen && file.id == modId ? (
                              <Grid
                                xs={6}
                                style={{
                                  margin: "auto",
                                  textAlign: "center",
                                }}
                              >
                                <SaveIcon
                                  className="saveIcon"
                                  id={file.id}
                                  style={{
                                    color: accent,
                                    cursor: "pointer",
                                    fontSize: "1.5em",
                                    alignSelf: "center",
                                  }}
                                  onClick={() => {
                                    handleNameUpdate(file.file_name, file.id);
                                  }}
                                />
                              </Grid>
                            ) : null}
                            <Grid
                              // xs={modOpen ? 1 : 3}
                              xs={1}
                              style={{
                                textAlign: "center",
                                margin: "auto",
                                paddingRight: 10,
                              }}
                            >
                              {modOpen && file.id == modId ? (
                                <CloseIcon
                                  className="editIcon"
                                  style={{
                                    color: "red",

                                    cursor: "pointer",
                                    fontSize: "1.7em",
                                  }}
                                  onClick={() => {
                                    setFileName(file.file_name);
                                    setModOpen(!modOpen);
                                    if (modId !== file.id) {
                                      setModOpen(true);
                                      setModId(file.id);
                                    }
                                  }}
                                />
                              ) : (
                                <CreateIcon
                                  className="editIcon"
                                  style={{
                                    color: accent,
                                    cursor: "pointer",
                                    fontSize: "1.5em",
                                  }}
                                  onClick={() => {
                                    setFileName(file.file_name);
                                    setModOpen(!modOpen);
                                    if (modId !== file.id) {
                                      setModOpen(true);
                                      setModId(file.id);
                                    }
                                  }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* filesize and delete row */}
                        {modOpen && file.id == modId ? (
                          <Grid
                            container
                            xs={10}
                            style={{
                              width: "100%",
                              scrollY: "hidden",
                              scrollX: "hidden",
                              padding: 5,
                            }}
                          >
                            <Grid
                              container
                              style={{ width: "100%", display: "flex" }}
                            >
                              <Grid
                                item="true"
                                xs={8}
                                sm={6}
                                style={{
                                  textAlign: "center",
                                  paddingTop: 8,
                                  borderRight: "1px solid #808080",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "lightgray",
                                    fontSize: "1.2em",
                                    whiteSpace: "nowrap",
                                    // zIndex: -1,
                                  }}
                                >
                                  {formatBytes(file.file_size)}
                                </Text>
                              </Grid>
                              <Grid
                                item="true"
                                xs={4}
                                sm={6}
                                style={{
                                  textAlign: "center",
                                  paddingTop: 8,
                                  borderLeft: "1px solid #808080",
                                }}
                              >
                                <DeleteForeverIcon
                                  style={{
                                    color: "#ffc400",
                                    cursor: "pointer",
                                    fontSize: "1.8em",
                                    margin: "auto",
                                  }}
                                  onClick={() => {
                                    dispatch(deleteFile(file.id));
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : null}
                      </Grid>
                    </li>
                  </Grid>
                </Grid>

                {/* </Card.Content> */}
              </Card>
            );
          })}
      </Grid>
    </ul>
  ) : null;

export default FileList;
