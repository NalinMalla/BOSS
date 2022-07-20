import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

export default function AddressForm(props) {
  const [province, setProvince] = React.useState("");

  const handleChange = (event) => {
    setProvince(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom color="primary">
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="middleName"
            name="middleName"
            label="Middle name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            id="addressDetails"
            name="addressDetails"
            label="Address Details"
            fullWidth
            autoComplete="shipping address-detail"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth required>
            <InputLabel id="province">Province</InputLabel>
            <Select
              labelId="province"
              id="province"
              value={province}
              label="Province"
              onChange={handleChange}
            >
              <MenuItem value={1}>Province 1</MenuItem>
              <MenuItem value={2}>Province 2</MenuItem>
              <MenuItem value={3}>Province 3</MenuItem>
              <MenuItem value={4}>Province 4</MenuItem>
              <MenuItem value={5}>Province 5</MenuItem>
              <MenuItem value={6}>Province 6</MenuItem>
              <MenuItem value={7}>Province 7</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contactNum"
            name="contactNum"
            label="Contact Number"
            fullWidth
            autoComplete="shipping phone-num"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="shipping email"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} style={{...props.saveCheckboxStyle,}}>
          <FormControlLabel
            control={
              <Checkbox color="primary" name="saveAddress" value="yes" />
            }
            label="Save these shipping details"
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{ display: "none", ...props.saveButtonStyle,justifyContent: "flex-end"}}
        >
          <Button size="large" variant="contained">Save Shipping Details</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
