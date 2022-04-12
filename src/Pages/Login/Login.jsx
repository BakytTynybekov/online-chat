import { Button, Divider, Grid, TextField } from "@mui/material";
import React from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./login.scss";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { loginWithEmailAndPassword, user } = useContext(AuthContext);
  console.log(user);

  const handleSubmit = (e) => {
    loginWithEmailAndPassword(loginInfo.email, loginInfo.password);
  };
  return (
    <div>
      {!user ? (
        <div className="login">
          <h1>Join to the chat</h1>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  style={{}}
                  label="Email"
                  variant="outlined"
                  value={loginInfo.email}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type={"password"}
                  value={loginInfo.password}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => handleSubmit()}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default Login;
