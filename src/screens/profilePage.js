import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import Header from "../components/header";
import NavBar from "../components/navBar";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import ProfileList from "../components/profileList";
import { styled } from "@mui/material/styles";

import Colors from "../res/colors";
import Images from "../res/images";

const Input = styled("input")({
  display: "none",
});

const ProfilePage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
      <div
        style={{
          ...styles.wrapper,
          width: "92%",
          flex: 1,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div
          style={{
            ...styles.container,
            flex: 0.22,
          }}
        >
          <div
            style={{
              ...styles.container,
              background: "#FFF",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              width: "100%",
              borderRadius: 3,
              paddingBottom: 8,
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                m: 1,
                bgcolor: Colors.primary,
                mt: 2,
              }}
            >
              <img
                src={Images.Bed}
                alt="profile pic"
                style={{ width: 90, height: 90 }}
              />
            </Avatar>

            <span
              style={{ color: Colors.primary, fontSize: 22, fontWeight: 500 }}
            >
              Nalin Malla
            </span>
          </div>
          <ProfileList />
        </div>
        <div
          style={{
            ...styles.container,
            flex: 0.75,
            background: "#FFF",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                style={{
                  width: 80,
                  height: 80,
                  marginTop: 30,
                  boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                  background: '#F9F9F9'
                }}
              >
                <PhotoCamera style={{ width: 44, height: 44 }} />
              </IconButton>
            </label>

            <Typography
              component="h1"
              variant="h4"
              sx={{ color: Colors.primary, fontSize: 30, mt: 1 }}
            >
              User Profile
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                my: 4,
                ml: 3,
                mr: 3,
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="contactNum"
                    label="Contact Number"
                    name="contactNum"
                    autoComplete="contactNum"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={handleGenderChange}
                    >
                      <MenuItem value={10}>Male</MenuItem>
                      <MenuItem value={20}>Female</MenuItem>
                      <MenuItem value={30}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 5,
                  mb: 1,
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    height: "50px",
                    backgroundColor: Colors.primary,
                    fontSize: "16px",
                  }}
                >
                  Save Profile
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  href="passwordReset"
                  sx={{
                    height: "50px",
                    backgroundColor: Colors.primary,
                    fontSize: "16px",
                  }}
                >
                  Change Password
                </Button>
              </Stack>
            </Box>
          </Box>
        </div>
      </div>

      <div
        style={{
          ...styles.container,
          backgroundColor: Colors.primary,
          width: "100%",
          marginTop: 60,
        }}
      >
        <SiteMap />
        <Copyright />
      </div>

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        component={<SignIn />}
      />
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default ProfilePage;
