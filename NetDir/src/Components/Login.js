import React, { useState } from "react";
import { Grid } from "@mui/material";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { accent, border, background, nDark } from "../variables/Colors";
import { Pressable, Text } from "react-native";
import { setUser } from "../../redux/slices/FileSlice";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    await axios.get("/sanctum/csrf-cookie");
    try {
      const response = await axios.post("http://192.168.1.95:8000/login", user);
      console.log(response.data);
      const loggedUser = [
        {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        },
      ];
      localStorage.setItem("user_id", response.data.id);
      localStorage.setItem("user_name", response.data.name);
      localStorage.setItem("user_email", response.data.email);
      navigate("/Home");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Login error:", error.response.data.error);
      } else {
        console.log("rrrrrrrrrr");

        console.error("Error during login:", error);
        document.querySelector("#loginBtn").style.transition = "0.5s";
        document.querySelector("#loginBtn").style.backgroundColor = "red";
        setTimeout(() => {
          document.querySelector("#loginBtn").style.backgroundColor = accent;
        }, 1000);
      }
    }
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
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          onSubmit={handleSubmit}
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

          <Pressable
            id="loginBtn"
            style={{
              backgroundColor: accent,
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              margin: 10,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "lightblack" }}>Log In</Text>
          </Pressable>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
