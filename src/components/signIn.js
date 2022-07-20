import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useState, useEffect } from "react";

import Colors from "../res/colors";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color={"text.secondary"}
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://bira.com.np/" underline="hover">
        BIRA Builders & Suppliers PVT. LTD.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  //password hide and show frontend
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  //Authentication
  useEffect(() => {
    document.title = "BOSS-SignIn";
    if (localStorage.getItem("rememberMe") != "true") {
      localStorage.clear();
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailInValid, setIsEmailInValid] = useState(false);
  const [isPasswordInValid, setIsPasswordInValid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  let user = null;

  // function changeLoggedIn(loggedIn) {
  //   props.changeLoggedIn(loggedIn);
  // }

  function storeInfoToLocalStorage() {
    localStorage.setItem("rememberMe", rememberMe);
    if (user !== null) {
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userFirstName", user.name.firstName);
      localStorage.setItem("userMiddleName", user.name.middleName);
      localStorage.setItem("userLastName", user.name.lastName);
    }
  }

  const redirectToHomepage = () => {
    window.location.href = "/";
    // changeLoggedIn(true);
  };

  function emailIsIncorrect(isEmailIncorrect) {
    if (isEmailIncorrect) {
      setEmailErrorMessage("E-mail address is incorrect.");
      setIsEmailInValid(true);
    } else {
      setEmailErrorMessage("");
      setIsEmailInValid(false);
    }
  }

  function passwordIsIncorrect(isPasswordIncorrect) {
    if (isPasswordIncorrect) {
      setPasswordErrorMessage("Password is incorrect.");
      setIsPasswordInValid(true);
    } else {
      setPasswordErrorMessage("");
      setIsPasswordInValid(false);
    }
  }

  function emailIsNull() {
    setEmailErrorMessage("E-mail address is required.");
    setIsEmailInValid(true);
  }

  function passwordIsNull() {
    setPasswordErrorMessage("Password is required.");
    setIsPasswordInValid(true);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const getUserInfoByEmail = (email) => {
    const ApiURL = `http://localhost:5000/users/email/${email}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  async function isUserAuthorised(email, password) {
    const userInfo = await getUserInfoByEmail(email);
    if (userInfo === null) {
      return null;
    } else {
      setIsEmailInValid(false);
      if (userInfo.password === password) {
        user = {
          id: userInfo._id,
          name: userInfo.userName,
          email: userInfo.email,
        };
        return true;
      }
      return false;
    }
  }

  const handleLogin = () => {
    isUserAuthorised(email, password).then((response) => {
      if (response === true) {
        emailIsIncorrect(false);
        passwordIsIncorrect(false);
        storeInfoToLocalStorage();
        redirectToHomepage();
      } else if (response === false) {
        passwordIsIncorrect(true);
        emailIsIncorrect(false);
      } else if (response === null) {
        emailIsIncorrect(true);
        passwordIsIncorrect(false);
      } else {
        alert(`Invalid data received.`);
      }

      if (email === "") {
        emailIsNull();
      }
      if (password === "") {
        passwordIsNull();
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ width: 84, height: 84, m: 1, bgcolor: Colors.primary }}>
        <LockOpenIcon sx={{ width: 42, height: 42 }} />
      </Avatar>
      <Typography
        component="h1"
        variant="h4"
        sx={{ color: Colors.primary, fontSize: 30 }}
      >
        Sign In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 2, color: Colors.primary, borderColor: Colors.primary }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          color="primary"
          value={email}
          onChange={handleEmailChange}
          error={isEmailInValid}
          helperText={emailErrorMessage}
        />

        <FormControl fullWidth variant="outlined" required sx={{ mt: 1 }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            error={isPasswordInValid}
            helperText={passwordErrorMessage}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          onChange={handleRememberMeChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            mb: 1,
            height: "50px",
            backgroundColor: Colors.primary,
            fontSize: "16px",
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href="/forgotPassword"
              variant="body1"
              sx={{ color: Colors.primary }}
              underline="hover"
              color={Colors.primary}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="signUp"
              variant="body1"
              sx={{ color: Colors.primary }}
              underline="hover"
              color={Colors.primary}
            >
              {"Don't have an account?"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
