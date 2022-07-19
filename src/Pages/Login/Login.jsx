import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./login.scss";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { loginWithEmailAndPassword, user, signInWithGoogle, signUpWithEmail } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    loginWithEmailAndPassword(loginInfo.email, loginInfo.password);
  };

  const handleCreateUser = () => {
    signUpWithEmail(loginInfo.email, loginInfo.password);
  };

  return (
    <div>
      {!user ? (
        <div className="login">
          <h1>Join to the chat</h1>
          <form>
            <Grid container spacing={2}>
              <Grid item fullWidth xs={12}>
                <TextField
                  style={{}}
                  label="Email"
                  variant="outlined"
                  value={loginInfo.email}
                  fullWidth
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
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
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSubmit()}
                >
                  Log in
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleCreateUser()}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={signInWithGoogle}
                >
                  Continue with Google
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
