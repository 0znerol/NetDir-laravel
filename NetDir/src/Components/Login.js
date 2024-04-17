import React, { useState } from "react";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
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
  const [Register, setRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const LoginUser = {
      email: email,
      password: password,
    };

    const RegisterUser = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    const csfrCookie = await axios.get("/sanctum/csrf-cookie");
    console.log(csfrCookie);
    try {
      const response = await axios.post(
        Register
          ? "http://192.168.1.95:8000/register"
          : "http://192.168.1.95:8000/login",
        Register ? RegisterUser : LoginUser,
        {
          headers: {
            // 'X-XSRF-TOKEN': , // Retrieve CSRF token from cookie
            "Content-Type": "application/json",
          },
        }
      );
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
        document.querySelector("#submitBtn").style.transition = "0.5s";
        document.querySelector("#submitBtn").style.backgroundColor = "red";
        setTimeout(() => {
          document.querySelector("#submitBtn").style.backgroundColor = accent;
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
        <Text
          style={{
            color: "white",
            fontSize: 20,
            margin: 10,
            transitionDuration: "0.5s",
          }}
        >
          {Register ? "Register" : "Login"}
        </Text>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          {Register && (
            <input
              style={{
                margin: 10,
                padding: 10,
                borderRadius: 5,
                border: "1px solid " + border,
                backgroundColor: nDark,
                color: "white",
                transitionDuration: "0.5s",
                position: "relative",
                top: 60,
                zIndex: 0,
              }}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={(el) => {
                if (el) {
                  setTimeout(() => {
                    el.style.top = 0;
                    el.style.zIndex = 1;
                  }, 10);
                }
              }}
            />
          )}
          <input
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 5,
              border: "1px solid " + border,
              backgroundColor: nDark,
              color: "white",
              zIndex: 1,
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
          {Register && (
            <input
              style={{
                margin: 10,
                padding: 10,
                borderRadius: 5,
                border: "1px solid " + border,
                backgroundColor: nDark,
                color: "white",
                transitionDuration: "0.5s",
                position: "relative",
                top: -60,
                zIndex: 0,
              }}
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              ref={(el) => {
                if (el) {
                  setTimeout(() => {
                    el.style.top = 0;
                    el.style.zIndex = 1;
                  }, 10);
                }
              }}
            />
          )}
          <Grid container style={{}}>
            <Grid
              id="submitBtn"
              item
              style={{
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: accent,
                borderRadius: 5,
                margin: 5,
                alignItems: "center",
                width: 55,
              }}
            >
              <Pressable
                style={{
                  paddingTop: 2,
                  width: "100%",
                  height: "100%",
                }}
                onPress={handleSubmit}
              >
                <Text style={{ color: "lightblack", margin: "auto" }}>
                  Submit
                </Text>
              </Pressable>
            </Grid>
            <Grid
              item
              style={{
                backgroundColor: accent,
                paddingLeft: 6,
                borderRadius: 5,
                alignItems: "center",
                margin: 5,
                // justifyContent: "center",
              }}
            >
              <Pressable
                style={
                  {
                    // margin: 10,
                  }
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "black", margin: "auto" }}
                      onClick={() => {
                        setRegister(!Register);
                        console.log(Register);
                      }}
                    />
                  }
                  label="Register"
                  style={{ margin: "auto", color: "black", fontSize: 1 }}
                  labelPlacement="start"
                />
              </Pressable>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
