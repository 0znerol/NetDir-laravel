import * as React from "react";
import Link from "@mui/material/Link";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { accent } from "../variables/Colors";
import { host } from "../variables/Network";
function preventDefault(event) {
  event.preventDefault();
}

export default function TotalFiles() {
  const files = useSelector((state) => state.allFiles.value);

  if (!files) {
    return <Text>Loading...</Text>;
  } else if (files.length === 0) {
    return (
      <View
        style={{
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "lightgrey" }}>
          No Files Found
        </Text>
      </View>
    );
  } else {
    // console.log(files[0].file_name);

    return (
      <View
        style={{
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "lightgrey" }}>
          File Totali
        </Text>
        <Text
          component="p"
          variant="h2"
          style={{ color: "lightgray", fontSize: 30 }}
        >
          {files.length}
        </Text>

        <Text sx={{ flex: 1 }} style={{ color: "lightgray", fontSize: "120%" }}>
          Last Upload:{" "}
          <a
            href={`http://${host}:8000/storage/app/public/user_${
              JSON.parse(localStorage.getItem("logged_user")).id
            }/${files[files.length - 1].file_location}/${
              files[files.length - 1].file_name
            }`}
            target="_blank"
            style={{
              color: "lightgray",
              textDecorationColor: accent,
            }}
          >
            {files[files.length - 1].file_name}
          </a>
        </Text>
        {/* <Text sx={{ flex: 1 }} style={{ color: "lightgray", fontSize: "120%" }}>
          Uploaded on: {files[files.length - 1].upload_date.slice(0, 10)} at{" "}
          {files[files.length - 1].upload_date.slice(11, 19)}
        </Text> */}
      </View>
    );
  }
}
