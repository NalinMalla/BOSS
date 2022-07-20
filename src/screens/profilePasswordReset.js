import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import LockResetIcon from "@mui/icons-material/LockReset";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Header from "../components/header";
import NavBar from "../components/navBar";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import ProfileList from "../components/profileList";

import Colors from "../res/colors";
import Images from "../res/images";

const ProfilePage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [values, setValues] = React.useState({
    currentPassword: "",
    showCurrentPassword: false,
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowCurrentPassword = () => {
    setValues({
      ...values,
      showCurrentPassword: !values.showCurrentPassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      newPassword: data.get("newPassword"),
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
            <Avatar
              sx={{
                width: 84,
                height: 84,
                m: 1,
                bgcolor: Colors.primary,
                mt: 6,
              }}
            >
              <LockResetIcon sx={{ width: 48, height: 48, marginLeft: -0.5 }} />
            </Avatar>

            <Typography
              component="h1"
              variant="h4"
              sx={{ color: Colors.primary, fontSize: 30, mt: 1 }}
            >
              Reset Password
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
              <Grid
                container
                spacing={2}
                style={{
                  paddingLeft: 80,
                  paddingRight: 80,
                }}
              >
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-currentPassword">
                      Current Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-currentPassword"
                      type={values.showCurrentPassword ? "text" : "password"}
                      value={values.currentPassword}
                      onChange={handleChange("currentPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle currentPassword visibility"
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Current Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-newPassword">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-newPassword"
                      type={values.showNewPassword ? "text" : "password"}
                      value={values.newPassword}
                      onChange={handleChange("newPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle newPassword visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-newPassword">
                      Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-newPassword"
                      type={values.showConfirmNewPassword ? "text" : "password"}
                      value={values.confirmNewPassword}
                      onChange={handleChange("confirmNewPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle newPassword visibility"
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showConfirmNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm New Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 4,
                      height: "50px",
                      backgroundColor: Colors.primary,
                      fontSize: "16px",
                    }}
                  >
                    RESET PASSWORD
                  </Button>
                </Grid>
              </Grid>
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
