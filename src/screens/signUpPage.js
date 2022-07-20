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
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
  });

  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let receiveOffer = true;

  const handleClickReceiveOffer = () => {
    receiveOffer= !receiveOffer;
    console.log("receive Offer: " + receiveOffer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const user = {
      firstName: data.get("firstName"),
      middleName: data.get("middleName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      dateOfBirth: data.get("date"),
      gender: data.get("gender"),
      receiveOffer: data.get("receiveOffer"),
      contact: data.get("contact"),
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
                  label="First Name"
                  autoFocus
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
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact No."
                  name="contact"
                  autoComplete="contact"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
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
                    type={values.showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showConfirmPassword ? (
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
