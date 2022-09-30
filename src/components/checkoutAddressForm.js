import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AddressForm(props) {
  const userId = localStorage.getItem("userId");

  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");

  const [addressDetail, setAddressDetail] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");

  const [addNewAddress, setAddNewAddress] = React.useState(true);

  const [saveAddress, setSaveAddress] = React.useState(false);

  let navigate = useNavigate();

  const handleClickSaveAddress = (event) => {
    console.log("!saveAddress");
    console.log(!saveAddress);
    setSaveAddress(!saveAddress);
  };

  const getUserInfoById = (userId) => {
    const ApiURL = `http://localhost:5000/users/${userId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const getAddressInfoByUserId = (userId) => {
    const ApiURL = `http://localhost:5000/users/address/${userId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  async function initializeAddressData(userId) {
    const addressInfo = await getAddressInfoByUserId(userId);
    if (addressInfo == null) {
      setAddNewAddress(true);
      const userInfo = await getUserInfoById(userId);
      if (userInfo === "") {
        alert("Error: Unable to access server.");
      } else {
        setFirstName(userInfo.userName.firstName);
        setMiddleName(userInfo.userName.middleName);
        setLastName(userInfo.userName.lastName);
        setEmail(userInfo.email);
        setContact(userInfo.contact.toString()); //returns in number type
      }
    } else {
      setAddNewAddress(false);
      setFirstName(addressInfo.receiversName.firstName);
      setMiddleName(addressInfo.receiversName.middleName);
      setLastName(addressInfo.receiversName.lastName);
      setEmail(addressInfo.email);
      setContact(addressInfo.contact.toString());
      setAddressDetail(addressInfo.addressDetail);
      setProvince(addressInfo.province.toString());
      setCity(addressInfo.city);
      setZipCode(addressInfo.zipCode.toString());
    }
  }

  React.useEffect(() => {
    document.title = "BOSS - User Address Book";
    if (userId == null) {
      navigate("/signIn");
    } else {
      initializeAddressData(userId); //wouldn't work without async await?
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

  const handleAddressDetailChange = (event) => {
    setAddressDetail(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("saveAddress");
    console.log(saveAddress);

    console.log("addNewAddress");
    console.log(addNewAddress);
    if (
      !(firstName.trim() === "") &&
      !(lastName.trim() === "") &&
      contactRGX.test(contact) &&
      emailRGX.test(email) &&
      !(province.trim() === "") &&
      !(city.trim() === "") &&
      !(addressDetail.trim() === "")
    ) {
      props.handleAddressValidation(true);

      const address = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        contact: contact,
        addressDetail: addressDetail,
        province: province,
        city: city,
        zipCode: zipCode,
        userId: userId,
      };

      props.setAddress(address);
      if (saveAddress || addNewAddress) {
        if (addNewAddress) {
          axios.post(`http://localhost:5000/users/address/add`, address).then(
            (res) => {
              console.log(res.data);
              alert("Successfully added the new address.");
            },
            (err) => {
              alert("Address was not added.\nError: " + err);
            }
          );
        } else {
          if (
            window.confirm(
              "Any new information will overwrite the previous details. \nAre you ok with this?"
            )
          ) {
            axios
              .put(
                `http://localhost:5000/users/address/update/${userId}`,
                address
              )
              .then(
                (res) => {
                  alert("Successfully updated Address Book.");
                },
                (err) => {
                  alert("Address Book was not updated.\nError: " + err);
                }
              );
          }
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom color="primary">
        Shipping address
      </Typography>
      <Grid container spacing={3}>
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

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required>
            <InputLabel id="province">
              {province.trim() === "" ? (
                <span style={{ color: "#D32F2F" }}>Empty field</span>
              ) : (
                "Province"
              )}
            </InputLabel>
            <Select
              labelId="province"
              id="province"
              name="province"
              value={province}
              label="Province"
              onChange={handleProvinceChange}
              error={province === ""}
            >
              <MenuItem value="1">Province 1</MenuItem>
              <MenuItem value="2">Province 2</MenuItem>
              <MenuItem value="3">Province 3</MenuItem>
              <MenuItem value="4">Province 4</MenuItem>
              <MenuItem value="5">Province 5</MenuItem>
              <MenuItem value="6">Province 6</MenuItem>
              <MenuItem value="7">Province 7</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            label={city.trim() === "" ? "Enter the name of your city." : "City"}
            value={city}
            onChange={handleCityChange}
            error={city.trim() === ""}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            id="zip"
            name="zip"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            label="Zip / Postal code"
            value={zipCode}
            onChange={handleZipCodeChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            multiline
            id="addressDetails"
            name="addressDetails"
            fullWidth
            autoComplete="shipping address-detail"
            variant="standard"
            label={
              addressDetail.trim() === ""
                ? "Please input address details."
                : "Address Details"
            }
            value={addressDetail}
            onChange={handleAddressDetailChange}
            error={addressDetail.trim() === ""}
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
                  ? "Contact Number is required."
                  : "Invalid contact no."
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

        <Grid
          item
          xs={12}
          style={{
            ...props.saveCheckboxStyle,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="saveAddress"
                value={saveAddress}
                onClick={handleClickSaveAddress}
              />
            }
            label="Save this as your primary address"
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            ...props.saveButtonStyle,
            justifyContent: "flex-start",
          }}
        >
          <Button size="large" variant="contained" onClick={handleUpdate}>
            Use these Shipping Details
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

AddressForm.defaultProps = {
  setAddress: () => {},
  handleAddressValidation: () => {},
};
