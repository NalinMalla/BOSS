import * as React from "react";
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
import axios from "axios";

import ProfileHead from "../components/profileHead";
import ProfileList from "../components/profileList";
import { styled } from "@mui/material/styles";

import Colors from "../res/colors";

const Input = styled("input")({
  display: "none",
});

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");

  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");

  const [gender, setGender] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");

  const [password, setPassword] = React.useState(""); //for some reason using password as normal variable caused errors.

  const [profilePic, setProfilePic] = React.useState(null);

  const getUserInfoById = (userId) => {
    const ApiURL = `http://localhost:5000/users/${userId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const deleteUserProfile = () => {
    const ApiURL = `http://localhost:5000/users/delete/${userId}`;
    if (
      window.confirm(
        "Your profile is about to be deleted. \nAre you sure you want to delete your user profile?"
      )
    ) {
      axios
      .delete(ApiURL)
      .then(
        (res) => {
          alert("Profile successfully deleted.");
          window.location.href = "/logOut";
        },
        (err) => {
          alert("Profile was not deleted.\nError: " + err);
          console.log("Err");
        }
      );
    }
  };

  async function initializeUserData(userId) {
    const userInfo = await getUserInfoById(userId);
    if (userInfo === "") {
      alert("Error: Unable to access server.");
    } else {
      setFirstName(userInfo.userName.firstName);
      setMiddleName(userInfo.userName.middleName);
      setLastName(userInfo.userName.lastName);
      setEmail(userInfo.email);
      setContact(userInfo.contact.toString()); //returns in number type
      setDateOfBirth(userInfo.dateOfBirth.toString().substring(0, 10)); //returns in a different format
      setGender(userInfo.gender);
      setPassword(userInfo.password);
      setProfilePic(userInfo.profilePic);
    }
  }

  async function storeInfoToLocalStorage(userId) {
    const user = await getUserInfoById(userId);
    if (user !== null) {
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userFirstName", user.userName.firstName);
      localStorage.setItem("userMiddleName", user.userName.middleName);
      localStorage.setItem("userLastName", user.userName.lastName);
      localStorage.setItem("userContact", user.contact);
      localStorage.setItem("userProfilePic", user.profilePic);
    } else {
      alert("User not found.");
    }
  }

  React.useEffect(() => {
    document.title = "BOSS - User Profile Page";
    if (userId == null) {
      window.location = "/signIn";
    } else {
      initializeUserData(userId); //wouldn't work without async await?
    }
  }, []);

  const emailRGX = /^([a-z A-Z 0-9 \._-]+)@([a-z A-Z 0-9 -]+)\.([a-z]{2,20})$/;
  const contactRGX = /^[0-9]{9,10}$/;

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

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
    console.log(profilePic);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (
      !(firstName.trim() === "") &&
      !(lastName.trim() === "") &&
      contactRGX.test(contact) &&
      emailRGX.test(email) &&
      !(dateOfBirth.trim() === "") &&
      !(gender.trim() === "")
    ) {
      const formData = new FormData(event.currentTarget);
      formData.append("password", password);
      console.log("formData");
      console.log(formData.profilePic);

      if (
        window.confirm(
          "Your profile is about to be overwritten. The previous details will be lost. \nAre you ok with this?"
        )
      ) {
        axios({
          method: "put",
          url: `http://localhost:5000/users/update/${userId}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(
          (res) => {
            storeInfoToLocalStorage(userId);
            console.log(res.data);
            console.log("Res");
            alert("Updated profile successfully.");
            window.location.href = "/profile";
          },
          (err) => {
            alert("Profile was not updated.\nError: " + err);
            console.log("Err");
          }
        );
      }
    } else {
      alert("Invalid input.");
    }
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
            component="form"
            noValidate
            onSubmit={handleUpdate}
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            enctype="multipart/form-data"
          >
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                name="profilePic"
                onClick={handleProfilePicChange}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                style={{
                  width: 80,
                  height: 80,
                  marginTop: 30,
                  boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
                  background: "#F9F9F9",
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
                    label={firstName.trim() === "" ? "Unfilled" : "First Name"}
                    autoFocus
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={firstName.trim() === ""}
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
                    label={lastName.trim() === "" ? "Unfilled" : "Last Name"}
                    value={lastName}
                    onChange={handleLastNameChange}
                    error={lastName.trim() === ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="contact"
                    name="contact"
                    autoComplete="contact"
                    label={
                      contact.trim() === "" || !contactRGX.test(contact)
                        ? contact.trim() === ""
                          ? "Empty field"
                          : "Invalid contact number"
                        : "Contact Number"
                    }
                    value={contact}
                    onChange={handleContactChange}
                    error={contact.trim() === "" || !contactRGX.test(contact)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    label={
                      email.trim() === "" || !emailRGX.test(email)
                        ? email.trim() === ""
                          ? "Email Address is required."
                          : "Invalid email address."
                        : "Email Address"
                    }
                    value={email}
                    onChange={handleEmailChange}
                    error={email.trim() === "" || !emailRGX.test(email)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label={
                      dateOfBirth.trim() === ""
                        ? "Empty field"
                        : "Date of Birth"
                    }
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    error={dateOfBirth.trim() === ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required defaultValue="">
                    <InputLabel id="demo-simple-select-label">
                      {gender.trim() === "" ? (
                        <span style={{ color: "#D32F2F" }}>Unfilled</span>
                      ) : (
                        "Gender"
                      )}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="gender"
                      value={gender}
                      label="Gender"
                      error={gender === ""}
                      onChange={handleGenderChange}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
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
                  Update Profile
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  href="/profile/passwordReset"
                  sx={{
                    height: "50px",
                    backgroundColor: Colors.primary,
                    fontSize: "16px",
                  }}
                >
                  Change Password
                </Button>
              </Stack>
              <Grid item xs={12} sm={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={deleteUserProfile}
                  sx={{
                    height: "50px",
                    backgroundColor: Colors.primary,
                    fontSize: "16px",
                  }}
                >
                  DELETE PROFILE
                </Button>
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
