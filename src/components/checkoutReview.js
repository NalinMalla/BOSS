import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Audio } from "react-loader-spinner";

import ProductList from "../components/productList";
import Colors from "../res/colors";
import Icons from "../res/icons";

export default function Review(props) {
  const userId = localStorage.getItem("userId");
  const [addressInfo, setAddressInfo] = React.useState(props.address);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    console.log("in useEffect");
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  console.log("addressInfo");
  console.log(addressInfo);

  return !isLoaded ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 20,
      }}
    >
      <Audio
        height="100"
        width="100"
        radius="12"
        color={Colors.primary}
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />

      <div style={{ fontSize: 22, fontWeight: 500, marginTop: 10 }}>
        Loading...
      </div>
    </div>
  ) : (
    <React.Fragment>
      <Typography variant="h5" gutterBottom color="primary">
        Order Details:
      </Typography>

      <ProductList products={props.products} counterDisabled={true} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping Details
          </Typography>
          <div>
            Receivers Name: {addressInfo.firstName + " " + addressInfo.lastName}
          </div>
          <div>Email Address: {addressInfo.email}</div>
          <div>Contact Number: {addressInfo.contact}</div>
          <div>
            Address: Province {addressInfo.province}, {addressInfo.city}
          </div>
          <div>Address Details: {addressInfo.addressDetail}</div>
          <div>Zip Code: {addressInfo.zipCode}</div>
        </Grid>
        <Grid item container direction="column" xs={12} sm={4}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Payment details
            </Typography>
            <img
              src={Icons.CashOnDelivery}
              alt="Cash On Delivery"
              style={{ width: 70, height: 70, marginTop: 10 }}
            />
            <div style={{ marginTop: 10 }}>Cash on Delivery</div>
          </div>

          <Grid container></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
