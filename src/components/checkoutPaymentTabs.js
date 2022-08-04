import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
// import { Button } from "@mui/material";

import Icons from "../res/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const PaymentTab = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box style={props.style}>
      <Typography variant="h6" gutterBottom color="primary">
        Payment method
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 3 }}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { background: "brown" } }}
        >
          <Tab
            style={{ height: 100, fontSize: 16, fontWeight: "bold" }}
            icon={
              <img
                src={Icons.CashOnDelivery}
                alt="Cash On Delivery"
                style={{ width: 60, height: 60 }}
              />
            }
            label="Cash On Delivery"
            index={0}
          />
          {/* <Tab
            style={{
              height: 100,
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 20,
            }}
            icon={
              <img
                src={Icons.Credit}
                alt="Credit/Debit Card"
                style={{ width: 60, height: 60 }}
              />
            }
            label="Credit/Debit Card"
            index={1}
          />
          <Tab
            style={{
              height: 100,
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 20,
            }}
            icon={
              <img
                src={Icons.Esewa}
                alt="Esewa"
                style={{ width: 60, height: 60 }}
              />
            }
            label="Esewa"
            index={2}
          /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        You can pay in cash to our delivery personnel when you receive the goods
        at your doorstep.
      </TabPanel>

      {/* <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} style={{ ...props.saveCheckboxStyle }}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Remember credit card details for next time"
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "none",
              ...props.saveButtonStyle,
              justifyContent: "flex-end",
            }}
          >
            <Button size="large" variant="contained">
              Save Payment Method
            </Button>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        You will be redirected to your eSewa account to complete your payment:
        <br />
        <br />
        1. Login to your eSewa account using your eSewa ID and your PIN.
        <br />
        2. Ensure your eSewa account is active and has sufficient balance.
        <br />
        3. Enter OTP (one time password) sent to your registered mobile number.
        <br />
        <br />
        ***Login with your eSewa mobile and PIN.***
      </TabPanel> */}
    </Box>
  );
};

export default PaymentTab;
