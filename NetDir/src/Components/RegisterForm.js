import React, { useState } from "react";
import { Grid } from "@mui/material";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { accent, border, background, nDark } from "../variables/Colors";
import { Pressable, Text } from "react-native";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    await axios.get("/sanctum/csrf-cookie");
    await axios
      .post("http://192.168.1.95:8000/register", user)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user_id", response.data.id);
        localStorage.setItem("user_name", response.data.name);
        localStorage.setItem("user_email", response.data.email);

        navigate("/Home");
        // dispatch(fetchFilesDb());
        // dispatch(filesPerDay());
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        document.querySelector("#registerBtn").style.transition = "0.5s";
        document.querySelector("#registerBtn").style.backgroundColor = "red";
        setTimeout(() => {
          document.querySelector("#registerBtn").style.backgroundColor = accent;
        }, 1000);
      });

    // await axios.get("/sanctum/csrf-cookie");
    // const response = await axios.post("http://192.168.1.95:8000/register", {
    //   name : name,
    //   email: email,
    //   password: password,
    //   password_confirmation: passwordConfirmation,
    // });
  };

  return (
    <Grid
      container
      style={{
        paddingTop: 60,
        // paddingLeft: 10,
        // paddingRight: 10,
        margin: 20,
        justifyContent: "center",
        // backgroundColor: "#262429",
        // height: "50px",
        // overflowY: "scroll",
        // padding: "5px",
      }}
    >
      <Grid
        item
        xs={12}
        style={{
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <input
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 5,
              border: "1px solid " + border,
              backgroundColor: nDark,
              color: "white",
            }}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 5,
              border: "1px solid " + border,
              backgroundColor: nDark,
              color: "white",
            }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 5,
              border: "1px solid " + border,
              backgroundColor: nDark,
              color: "white",
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 5,
              border: "1px solid " + border,
              backgroundColor: nDark,
              color: "white",
            }}
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Pressable
            id="registerBtn"
            style={{
              backgroundColor: accent,
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              margin: 10,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "lightblack" }}>Register</Text>
          </Pressable>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
