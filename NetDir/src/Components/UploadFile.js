import React, { useState, useEffect } from "react";
import { View, Button, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { fetchFilesDb } from "../../redux/slices/FileSlice";
import { filesPerDay } from "../../redux/slices/FileSlice";
import { accent, background } from "../variables/Colors";
import axios from "../api/axios";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const UploadFile = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const filesPerD = useSelector((state) => state.allFiles.filesPerD);
  const handleFileChange = (file) => {
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    if (filesPerD.length === 0) {
      dispatch(filesPerDay());
    }
  }, []);

  async function handleUpload() {
    console.log("Uploading file..." + file);
    if (file) {
      // console.log(JSON.stringify(file));
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", localStorage.getItem("user_id"));
      //formData.append("_token", csrfToken);
      await axios.get("/sanctum/csrf-cookie");
      setIsLoading(true);
      await axios
        .post("http://192.168.1.95:8000/api/uploadFile", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(progress);
          },
        })
        .then((response) => {
          console.log(response.data);
          dispatch(fetchFilesDb());
          dispatch(filesPerDay());
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setErrorModal(true);
        });
    }
  }

  return (
    <Grid>
      <input
        type="file"
        id="fileInput"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Pressable
        style={{
          backgroundColor: accent,
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          margin: 10,
        }}
        onPress={() => document.getElementById("fileInput").click()}
      >
        <Text style={{ color: "lightblack" }}>SELECT FILE</Text>
      </Pressable>
      {file ? (
        <>
          <Text style={{ color: "lightgrey", textAlign: "center" }}>
            {file.name}
          </Text>
          <Pressable
            style={{
              backgroundColor: accent,
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              margin: 10,
            }}
            onPress={handleUpload}
          >
            <Text style={{ color: "lightblack" }}>UPLOAD</Text>
          </Pressable>
          {progress < 100 ? (
            <LinearProgress
              variant="determinate"
              value={progress}
              // color="primary"

              color={"success"}
              style={{ backgroundColor: accent }}
            />
          ) : null}
          {errorModal ? (
            /* (setTimeout(() => {
                // document.querySelector(".errorModal").style.transition = "1.5s";
                document.querySelector(".errorModal").style.opacity = 1;
              }, 1000),
              setTimeout(() => {
                // document.querySelector(".errorModal").style.transition = "1.5s";
                document.querySelector(".errorModal").style.opacity = 0;
              }, 2000),
              setTimeout(() => {
                setErrorModal(false);
              }, 3000), */
            <Grid
              className="errorModal"
              style={{
                transition: "1.5s",
                opacity: 0,
              }}
              ref={(el) => {
                if (el) {
                  el.style.opacity = 1;
                  setTimeout(() => {
                    el.style.opacity = 0;
                  }, 2000);
                  setTimeout(() => {
                    setErrorModal(false);
                  }, 3000);
                }
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 5,
                  alignItems: "center",
                  margin: 10,
                }}
                onPress={() => setErrorModal(false)}
              >
                <Text>ERROR UPLOADING FILE</Text>
              </Pressable>
            </Grid>
          ) : null}
        </>
      ) : null}

      {/* <FilePicker onFileSelect={handleFileChange} /> */}
    </Grid>
  );
};

export default UploadFile;
