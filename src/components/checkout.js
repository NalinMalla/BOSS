import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AddressForm from "./checkoutAddressForm";
import PaymentTab from "./checkoutPaymentTabs";
import Review from "./checkoutReview";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressValid, setAddressValid] = React.useState(false);
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = React.useState(null);
  const [order] = React.useState({ userId: userId,products: props.products, payment: "cash on delivery" });
  const [orderNumber, setOrderNumber] = React.useState("");

  let navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log("Place Order");
      axios.post("http://localhost:5000/users/order/create", order).then(
        (res) => {
          console.log(res.data.message);
          setOrderNumber(res.data.message);
          setActiveStep(activeStep + 1);
        },
        (err) => {
          alert("Order placement was unsuccessful.\nError: " + err);
        }
      );
    } else {
      if (addressValid) {
        setActiveStep(activeStep + 1);
      } else {
        alert("No usable shipping address is specified.");
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    console.log("props.products");
    console.log(props.products);
    console.log(step);
    switch (step) {
      case 0:
        return <AddressForm handleAddressValidation={setAddressValid} setAddress={setAddress}/>;
      case 1:
        return <PaymentTab />;
      case 2:
        return <Review products={props.products} />;
      default:
        throw new Error("Unknown step");
    }
  }

  React.useEffect(() => {
    if (userId == null) {
      navigate("/signIn");
    } else {
      if (address !== null) {
        order.address = address;
      }
    } 
  }, [address]);

  console.log("order");
  console.log(order);

  return (
    <div style={{ width: "100%" }}>
      <Paper
        variant="outlined"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          paddingTop: 40,
          backgroundColor: "#FdFdFd",
        }}
        sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 8 } }}
      >
        <Typography component="h1" variant="h4" align="center" color="primary">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderNumber}. We will keep you updated about your order status.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </div>
  );
}

Checkout.defaultProps = {
  orderNum: 0,
};
