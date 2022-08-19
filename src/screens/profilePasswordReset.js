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
import axios from "axios";

import ProfileList from "../components/profileList";
import ProfileHead from "../components/profileHead";

import Colors from "../res/colors";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  React.useEffect(() => {
    document.title = "BOSS - Password Reset";
    if (userId == null) {
      window.location = "/signIn";
    }
  }, []);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isCredentialsInvalid, setIsCredentialsInvalid] = React.useState(true);
  const [valid, setValid] = React.useState(true);

  const getUserInfoById = (userId) => {
    const ApiURL = `http://localhost:5000/users/${userId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  let user;
  async function isUserAuthorized(userId, currentPassword) {
    const userInfo = await getUserInfoById(userId);
    if (userInfo == null) {
      alert("Error: Unable to access database.");
      return false;
    } else {
      if (userInfo.password === currentPassword) {
        setIsCredentialsInvalid(false);
        user = {
          firstName: userInfo.userName.firstName,
          middleName: userInfo.userName.middleName,
          lastName: userInfo.userName.lastName,
          email: userInfo.email,
          password: newPassword,
          dateOfBirth: userInfo.dateOfBirth.toString(),
          gender: userInfo.gender,
          receiveOffer: userInfo.receiveOffer,
          contact: userInfo.contact.toString(),
          profilePic: userInfo.profilePic,
        };
        return true;
      }
      setIsCredentialsInvalid(true);
      return false;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    isUserAuthorized(userId, currentPassword)
      .then((response) => {
        if (response === true) {
          if (newPassword === confirmPassword && newPassword.trim() !== "") {
            if (
              window.confirm(
                "Your are about to change your password. \nAre you sure you want to continue?"
              )
            ) {
              axios
                .put(`http://localhost:5000/users/update/${userId}`, user)
                .then(
                  (res) => {
                    console.log(res.data);
                    console.log("Res");
                    alert("Password Reset Successfully.");
                    setValid(true);
                    localStorage.clear();
                    window.location = "/signIn";
                  },
                  (err) => {
                    alert("Password was not reset.\nError: " + err);
                    console.log("Err");
                    setValid(false);
                  }
                );
            }
          }
          else {
            setValid(false);
          }
        } else {
          setValid(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="root" style={styles.root}>
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
          <ProfileHead />
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
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-currentPassword">
                      {(currentPassword.trim() === "" ||
                        isCredentialsInvalid) &&
                      valid === false ? (
                        currentPassword.trim() === "" ? (
                          <span style={{ color: "#D32F2F" }}>
                            Field is required
                          </span>
                        ) : (
                          <span style={{ color: "#D32F2F" }}>
                            Invalid Password
                          </span>
                        )
                      ) : (
                        "Current Password"
                      )}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={handleCurrentPasswordChange}
                      error={
                        (currentPassword.trim() === "" ||
                          isCredentialsInvalid) &&
                        valid === false
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showCurrentPassword ? (
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
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-newPassword">
                      {(newPassword.trim() === "" ||
                        confirmPassword !== newPassword) &&
                      valid === false ? (
                        confirmPassword !== newPassword ? (
                          <span style={{ color: "#D32F2F" }}>
                            Mismatched 
                          </span>
                        ) : (
                          <span style={{ color: "#D32F2F" }}>
                            Field is required
                          </span>
                        )
                      ) : (
                        "New Password"
                      )}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      error={
                        (newPassword.trim() === "" ||
                          confirmPassword !== newPassword) &&
                        valid === false
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
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
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-confirmPassword">
                      {(confirmPassword.trim() === "" ||
                        newPassword !== confirmPassword) &&
                      valid === false ? (
                        newPassword !== confirmPassword ? (
                          <span style={{ color: "#D32F2F" }}>
                            Mismatch Password
                          </span>
                        ) : (
                          <span style={{ color: "#D32F2F" }}>
                            Field is required
                          </span>
                        )
                      ) : (
                        "Confirm Password"
                      )}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      error={
                        (confirmPassword.trim() === "" ||
                          newPassword !== confirmPassword) &&
                        valid === false
                      }
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
                    onClick={handleSubmit}
                  >
                    RESET PASSWORD
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </div>
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
