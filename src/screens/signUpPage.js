import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CreateIcon from "@mui/icons-material/Create";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";

import Colors from "../res/colors";
import Images from "../res/images";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
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

export default function SignUp() {

  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [gender, setGender] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");

  const [receiveOffer, setReceiveOffer] = React.useState(true);

  const [valid, setValid] = React.useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleMiddleNameChange = (event) => {
    setMiddleName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickReceiveOffer = () => {
    receiveOffer = !receiveOffer;
    console.log("receive Offer: " + receiveOffer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    const user = {
      // firstName: data.get("firstName"),
      // middleName: data.get("middleName"),
      // lastName: data.get("lastName"),
      // email: data.get("email"),
      // password: data.get("password"),
      // dateOfBirth: data.get("date"),
      // gender: data.get("gender"),
      // receiveOffer: data.get("receiveOffer"),
      // contact: data.get("contact"),
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      gender: gender,
      receiveOffer: receiveOffer,
      contact: contact,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Images.SofaBrown})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 84, height: 84, m: 1, bgcolor: Colors.primary, mt: 3 }}
          >
            <CreateIcon sx={{ width: 42, height: 42 }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{ color: Colors.primary, fontSize: 30 }}
          >
            Sign Up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              my: 4,
              ml: 2,
              mr: 2,
              mt: 4,
              color: Colors.primary,
              borderColor: Colors.primary,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={(firstName.trim() === "")&&(valid === false) ? "Empty Field" : "First Name"}
                  autoFocus
                  value={firstName}
                  onChange={handleFirstNameChange}
                  error={(firstName.trim() === "")&&(valid === false)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="middleName"
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  autoFocus
                  defaultValue=""
                  value={middleName}
                  onChange={handleMiddleNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  label={(lastName.trim() === "")&&(valid === false) ? "Empty Field" : "Last Name"}
                  value={lastName}
                  onChange={handleLastNameChange}
                  error={(lastName.trim() === "")&&(valid === false)}
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  label={(email.trim() === "")&&(valid === false) ? "Empty Field" : "Email Address"}
                  value={email}
                  onChange={handleEmailChange}
                  error={(email.trim() === "")&&(valid ===false)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  name="contact"
                  autoComplete="contact"
                  label={(contact.trim() === "")&&(valid === false) ? "Empty Field" : "Contact No."}
                  value={contact}
                  onChange={handleContactChange}
                  error={(contact.trim() === "")&&(valid === false)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-password">
                    {(password.trim() === "")&&(valid === false) ? ((password === confirmPassword)?"Password is required." : "Password doesn't match.") : "Password"}Z
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  name="date"
                  label="Date of Birth"
                  required
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required defaultValue="">
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="gender"
                    value={gender}
                    label="Gender"
                    onChange={handleGenderChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 10 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={receiveOffer}
                    color="primary"
                    id="receiveOffer"
                    name="receiveOffer"
                    onClick={handleClickReceiveOffer}
                  />
                }
                label="I'd like to receive new offers and promotions via email."
              />
            </Grid>

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
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  sx={{ color: Colors.primary }}
                  underline="hover"
                  color={Colors.primary}
                  href="signIn"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 3 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
