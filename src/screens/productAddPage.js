import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Colors from "../res/colors";

import { TabPanel } from "../components/tabs";

const ProductAddPage = () => {
  const userId = localStorage.getItem("userId");

  const [deals, setDeals] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("0");
  const [discountRate, setDiscountRate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [specification, setSpecification] = React.useState("");
  const [quantity, setQuantity] = React.useState("0");
  const [discountPrice, setDiscountPrice] = React.useState("0");

  let [valid, setValid] = React.useState(true);

  React.useEffect(() => {
    document.title = "BOSS - Product Add Page";
    if (userId == null) {
      window.location = "/signIn";
    }
  }, []);

  const handleDealsChange = (event) => {
    setDeals(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSpecificationChange = (event) => {
    setSpecification(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    event.target.value > 0
    ? setDiscountPrice(
        (discountRate === "" || discountRate <=0 || discountRate > 100)
          ? event.target.value
          : Number(event.target.value) - (Number(discountRate) / 100) * Number(event.target.value)
      )
    : setDiscountPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleDiscountRateChange = (event) => {
    setDiscountRate(event.target.value);
    price > 0
    ? setDiscountPrice(
        (event.target.value === "" || event.target.value <=0 || event.target.value > 100)
          ? price
          : Number(price) - (Number(event.target.value) / 100) * Number(price)
      )
    : setDiscountPrice(price);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productPicSelected =
      formData.get("productPic0").name !== "" ||
      formData.get("productPic1").name !== "" ||
      formData.get("productPic2").name !== "" ||
      formData.get("productPic3").name !== "" ||
      formData.get("productPic4").name !== "" ||
      formData.get("productPic5").name !== "" ||
      formData.get("productPic6").name !== "";
    if (
      title.trim() !== "" &&
      category.trim() !== "" &&
      (discountRate.trim() === "" ||
        (Number(discountRate) >= 0 && Number(discountRate) <= 100)) &&
      price.trim() !== "" &&
      Number(price) >= 0 &&
      quantity.trim() !== "" &&
      Number(quantity) >= 0 &&
      productPicSelected
    ) {
      formData.append("title", title);
      formData.append("category", category.toLowerCase());
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("deals", deals);
      formData.append("discountRate", discountRate);
      formData.append("description", description);
      formData.append("specification", specification);
      formData.append("discountPrice", discountPrice);

      axios({
        method: "post",
        url: `http://localhost:5000/products/add`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(
        (res) => {
          console.log(res.data);
          console.log("Res");
          setValid(true);
          alert("Successfully Added Product.");
        },
        (err) => {
          setValid(false);
          alert("Product creation was unsuccessful.\nError: " + err);
        }
      );
    } else {
      setValid(false);
      if (!productPicSelected) {
        alert("Please select an image.");
      }
    }
  };

  return (
    <div id="root" style={styles.root}>
      <div style={styles.container}>
        <div style={{ ...styles.control, flex: 0.5 }}>
          <span
            style={{
              display: "flex",
              fontSize: 35,
              color: Colors.primary,
              fontWeight: 500,
            }}
          >
            Create Product
          </span>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              // my: 1,
              mt: 2,
              color: Colors.primary,
              borderColor: Colors.primary,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  name="title"
                  label={
                    title.trim() === "" && valid === false
                      ? "Empty field"
                      : "Product Title"
                  }
                  value={title}
                  onChange={handleTitleChange}
                  error={title.trim() === "" && valid === false}
                />
              </Grid>
              
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  name="category"
                  label={
                    category.trim() === "" && valid === false
                      ? "Empty field"
                      : "Product Category"
                  }
                  value={category}
                  onChange={handleCategoryChange}
                  error={category.trim() === "" && valid === false}
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="discountRate"
                  name="discountRate"
                  autoComplete="discountRate"
                  label={
                    discountRate.trim() !== "" &&
                    (Number(discountRate) < 0 || Number(discountRate) > 100) &&
                    valid === false
                      ? "Invalid Discount Rate."
                      : "Discount Rate"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  value={discountRate}
                  onChange={handleDiscountRateChange}
                  error={
                    discountRate.trim() !== "" &&
                    (Number(discountRate) < 0 || Number(discountRate) > 100) &&
                    valid === false
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  name="price"
                  autoComplete="price"
                  label={
                    (price.trim() === "" || Number(price) < 0) &&
                    valid === false
                      ? price.trim() === ""
                        ? "Empty field"
                        : "Invalid price."
                      : "Price"
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Rs.</InputAdornment>
                    ),
                  }}
                  value={price}
                  onChange={handlePriceChange}
                  error={
                    (price.trim() === "" || Number(price) < 0) &&
                    valid === false
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="quantity"
                  name="quantity"
                  autoComplete="quantity"
                  label={
                    (quantity.trim() === "" || Number(quantity) < 0) &&
                    valid === false
                      ? quantity.trim() === ""
                        ? "Empty field"
                        : "Invalid quantity."
                      : "Quantity"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">units</InputAdornment>
                    ),
                  }}
                  value={quantity}
                  onChange={handleQuantityChange}
                  error={
                    (quantity.trim() === "" || Number(quantity) < 0) &&
                    valid === false
                  }
                />
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <TextField
                  name="deals"
                  fullWidth
                  id="deals"
                  label="Offer Title"
                  autoFocus
                  value={deals}
                  onChange={handleDealsChange}
                />
              </Grid>

              <Grid item xs={12}>
                <span style={{ fontSize: 22 }}>
                  Discounted Price: {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} Rs.{" "}
                  {discountPrice}
                </span>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div style={{ display: "flex", flex: 0.07 }}></div>

        <div
          style={{
            ...styles.control,
            justifyContent: "space-around",
            alignItems: "center",
            flex: 0.43,
            paddingTop: 35,
            paddingBottom: 20,
          }}
        >
          <span
            style={{
              display: "flex",
              fontSize: 30,
              width: "100%",
              color: Colors.primary,
              fontWeight: 500,
            }}
          >
            Upload Product Images
          </span>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
            }}
            method="post"
            enctype="multipart/form-data"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic0"
                  class="form-control"
                ></input>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic1"
                  class="form-control"
                ></input>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic2"
                  class="form-control"
                ></input>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic3"
                  class="form-control"
                ></input>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic4"
                  class="form-control"
                ></input>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic5"
                  class="form-control"
                ></input>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic6"
                  class="form-control"
                ></input>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                height: "50px",
                backgroundColor: Colors.primary,
                fontSize: "16px",
              }}
            >
              Add Product
            </Button>
          </Box>
        </div>
      </div>
      <Box style={styles.tabbedPane}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="scrollable"
            value={0}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { background: "brown" } }}
          >
            <Tab
              style={{ fontSize: 20 }}
              label="Details & Overview"
              index={0}
            />
          </Tabs>
        </Box>
        <TabPanel value={0} index={0}>
          <div style={styles.tabPanel}>
            <div
              style={{
                padding: 20,
                borderRadius: 3,
                fontSize: 18,
                display: "flex",
                flexDirection: "column",
                width: "48%",
                backgroundColor: "#F5F5F5",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 550 }}>Description</div>
              <TextField
                label="Input the products description."
                multiline
                rows={4}
                style={{ marginTop: 15 }}
                name="description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>

            <div
              style={{
                padding: 20,
                borderRadius: 3,
                fontSize: 18,
                display: "flex",
                flexDirection: "column",
                width: "40%",
                backgroundColor: "#F5F5F5",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 550 }}>Specification</div>
              <TextField
                label="Input the products specification."
                multiline
                rows={4}
                style={{ marginTop: 15 }}
                name="specification"
                id="specification"
                value={specification}
                onChange={handleSpecificationChange}
              />
            </div>
          </div>
        </TabPanel>
      </Box>
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
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    alignItems: "center",
    marginTop: 60,
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 35,
  },
  control: {
    display: "flex",
    flexDirection: "column",
    padding: 40,
    backgroundColor: "#FFF",
    borderRadius: 3,
    // border : '1px solid black',
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  titleUnderline: {
    height: 3,
    backgroundColor: Colors.biraRed,
    marginTop: 5,
  },
  tabPanel: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
    borderRadius: 5,
    // background: '#f5f5f5',
  },
  tabbedPane: {
    marginTop: 32,
    width: "80%",
    background: "#FFF",
    borderRadius: 3,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
};

export default ProductAddPage;
