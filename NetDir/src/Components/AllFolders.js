import React from "react";
import { Grid } from "@mui/material";
import { Card } from "react-native-paper";
import { Platform, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoldersDb, fetchFilesDb } from "../../redux/slices/FileSlice";
import { useEffect, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import IconButton from "@mui/material/IconButton";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { accent, border, background, nDark } from "../variables/Colors";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Draggable from "react-draggable";
import axios from "../api/axios";
import { host } from "../variables/Network";

export default function AllFolders() {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.allFiles.folders);
  const files = useSelector((state) => state.allFiles.value);

  const [positions, setPositions] = useState(
    JSON.parse(localStorage.getItem("dragPositions")) || 0
  );

  useEffect(() => {
    localStorage.setItem("dragPositions", JSON.stringify(positions));
  }, [positions]);

  if (!folders || !files) {
    return <div>Loading...</div>;
  } else if (folders.length > 0) {
    return (
      <>
        {folders.map((folder, index) => {
          // console.log(folders);
          return (
            <Draggable
              position={positions[index]}
              onDrag={(e, data) => {
                setPositions((prevPositions) => ({
                  ...prevPositions,
                  [index]: { x: data.x, y: data.y },
                }));
              }}
              key={index}
              // style={{ width: "100%" }}
            >
              <Grid
                item={true}
                key={index}
                xs={3}
                style={{
                  margin: 10,
                  height: "fit-content",
                  width: "fit-content",
                  minWidth: "200px",

                  // marginTop: 20,
                  // position: "relative",

                  // zIndex: 100,
                }}
              >
                {Platform.OS === "web" ? (
                  <Card
                    style={{
                      borderRadius: 4,
                      borderWidth: 3,
                      borderColor: border,
                      // margin: 10,
                      width: "100%",
                      minWidth: "fit-content",
                    }}
                  >
                    <Grid
                      style={{
                        padding: 0,
                        paddingBottom: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        zIndex: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "2em",
                          color: "lightgray",
                          padding: 5,
                          marginTop: 7,
                        }}
                      >
                        {folder.folder_name}
                      </Text>
                      <Grid
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: 10,
                        }}
                      >
                        <IconButton
                          style={{ margin: "auto", marginRight: 20 }}
                          onClick={async () => {
                            // console.log("clicked");
                            try {
                              await axios.get("/sanctum/csrf-cookie");
                              const response = await axios.delete(
                                `/api/deleteFolder/${folder.id}`
                              );
                              dispatch(fetchFoldersDb());
                              return response.data;
                            } catch (error) {
                              console.error("Error deleting file:", error);
                              throw error;
                            }
                          }}
                        >
                          <FolderDeleteIcon
                            style={{
                              color: "red",
                              fontSize: "1.13em",
                              // margin: "auto",
                            }}
                          />
                        </IconButton>
                        <FormControl>
                          <InputLabel
                            id="demo-simple-select-label"
                            style={{ position: "absolute", left: -40, top: 17 }}
                          >
                            <IconButton
                              style={{ padding: 0 }}
                              onClick={() => {
                                // console.log("clicked");
                              }}
                            >
                              <NoteAddIcon
                                style={{
                                  color: accent,
                                  fontSize: "1.5em",
                                  margin: "auto",
                                }}
                              />
                            </IconButton>
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={folder.folder_name}
                            value={"none"}
                            label="Insert File"
                            onChange={async (e) => {
                              // console.log(files[1].file_name);
                              const formData = new FormData();
                              formData.append("fileName", e.target.value);
                              formData.append("folderName", e.target.name);
                              await axios.get("/sanctum/csrf-cookie");
                              await axios
                                .post(`/api/addFileInFolder`, formData, {
                                  headers: {
                                    "Content-type": "multipart/form-data",
                                  },
                                })
                                .then((response) => {
                                  dispatch(fetchFilesDb());
                                })
                                .catch((error) => {
                                  console.error(
                                    "Error uploading folder:",
                                    error
                                  );
                                });
                              //)))))))))))))))))))))))))))
                              // console.dir(e.target.name);
                              // fetch("http://localhost:8000/api/addFileInFolder", {
                              //   method: "POST",
                              //   headers: {
                              //     "Content-Type": "application/json",
                              //   },
                              //   body: JSON.stringify({
                              //     fileName: e.target.value,
                              //     folderName: e.target.name,
                              //   }),
                              // }).then((response) => {
                              //   dispatch(fetchFilesDb());
                              // });
                              //))))))))))))))))))))))))))))
                            }}
                            style={{
                              color: "lightgray",
                              height: "3vh",
                              margin: "auto",
                              width: "82%",
                              backgroundColor: nDark,
                            }}
                            inputProps={{
                              MenuProps: {
                                MenuListProps: {
                                  sx: {
                                    backgroundColor: border,
                                  },
                                },
                              },
                            }}
                          >
                            {files.map((file, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  value={file.file_name}
                                  style={{
                                    backgroundColor: background,
                                    color: "lightgray",
                                  }}
                                >
                                  {file.file_name}
                                </MenuItem>
                              );
                            })}
                            {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {files.map((file, index) => {
                      if (file.folder === folder.id) {
                        return (
                          <Grid
                            style={{
                              display: "flex",
                              justifyContent: "start",
                              padding: 10,
                            }}
                            key={index}
                          >
                            <a
                              href={`http://192.168.1.95:8000/api/show/${file.id}`}
                              target="_blank"
                              style={{
                                color: "lightgray",
                                textDecorationColor: accent,
                              }}
                            >
                              <Text style={{ color: "lightgray" }}>
                                {file.file_name}
                              </Text>
                            </a>
                          </Grid>
                        );
                      }
                    })}
                    {/* <Grid
                    style={{
                      display: "flex"
                      justifyContent: "start",
                      padding: 10,
                    }}
                  >
                    <Text style={{ color: "lightgray" }}>
                      {folder.folder_name}
                    </Text>
                  </Grid> */}
                  </Card>
                ) : null}
              </Grid>
            </Draggable>
          );
        })}
      </>
    );
  } else {
    return (
      <Grid container style={{ margin: 20 }}>
        <Text style={{ color: "lightgrey", fontSize: "1.5em" }}>
          No folders found
        </Text>
      </Grid>
    );
  }
}
