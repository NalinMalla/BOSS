import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

import Colors from "../res/colors";
import Icons from "../res/icons";

import { TabPanel } from "../components/tabs";

const ProductUpdatePage = () => {
  const userId = localStorage.getItem("userId");
  const productId = window.location.href.split("?")[1];

  let navigate = useNavigate();

  const [deals, setDeals] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("0");
  const [discountRate, setDiscountRate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [specification, setSpecification] = React.useState("");
  const [quantity, setQuantity] = React.useState("0");
  const [discountPrice, setDiscountPrice] = React.useState("0");
  const [tags, setTags] = React.useState("");
  const [image, setImage] = React.useState([]);

  const [questionAnswerData, setQuestionAnswerData] = React.useState([]);
  const [answers, setAnswers] = React.useState(0);

  const [reviewData, setReviewData] = React.useState([]);
  const [reviewsRating5, setReviewsRating5] = React.useState(0);
  const [reviewsRating4, setReviewsRating4] = React.useState(0);
  const [reviewsRating3, setReviewsRating3] = React.useState(0);
  const [reviewsRating2, setReviewsRating2] = React.useState(0);
  const [reviewsRating1, setReviewsRating1] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [validReviewers, setValidReviewers] = React.useState([]);

  let [valid, setValid] = React.useState(true);

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const getQuestionAnswerDataById = (productId) => {
    return axios
      .get(`http://localhost:5000/products/questionAnswer/${productId}`)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const getReviewDataById = (productId) => {
    return axios
      .get(`http://localhost:5000/products/review/${productId}`)
      .then((response) => response.data)
      .catch((error) => null);
  };

  async function initializeProductData(productId) {
    const productInfo = await getProductInfoById(productId);
    if (productInfo === null) {
      alert("Error: Unable to access server.");
    } else {
      setTitle(productInfo.title);
      setPrice(productInfo.price);
      setQuantity(productInfo.quantity);
      setCategory(productInfo.category);
      setDiscountPrice(productInfo.discountPrice);
      if (productInfo.discountRate !== undefined) {
        setDiscountRate(productInfo.discountRate);
      }

      if (productInfo.tags !== undefined) {
        setTags(productInfo.tags);
      }

      if (productInfo.description !== undefined) {
        setDescription(productInfo.description);
      }

      if (productInfo.specification !== undefined) {
        setSpecification(productInfo.specification);
      }

      if (productInfo.deals !== undefined) {
        setDeals(productInfo.deals);
      }

      setImage(productInfo.image);
    }

    const questionAnswer = await getQuestionAnswerDataById(productId);
    console.log("questionAnswerData get");
    console.log(questionAnswer);
    if (questionAnswer !== null) {
      setQuestionAnswerData(questionAnswer.questionAnswerData.reverse());
      setAnswers(questionAnswer.answers);
    }

    const review = await getReviewDataById(productId);
    setValidReviewers(review.validReviewers);
    setReviewsRating5(review.reviewsRating5);
    setReviewsRating4(review.reviewsRating4);
    setReviewsRating3(review.reviewsRating3);
    setReviewsRating2(review.reviewsRating2);
    setReviewsRating1(review.reviewsRating1);
    setRating(review.rating);

    if (review.reviewData.length !== 0) {
      setReviewData(review.reviewData.reverse());
    }
  }

  React.useEffect(() => {
    document.title = "BOSS - Product Page";
    if (productId === undefined) {
      navigate("/products/?add:");
    } else {
      initializeProductData(productId); //wouldn't work without async await?
    }
  }, []);

  const handleDealsChange = (event) => {
    setDeals(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
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
          discountRate === "" || discountRate <= 0 || discountRate > 100
            ? event.target.value
            : Number(event.target.value) -
                (Number(discountRate) / 100) * Number(event.target.value)
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
          event.target.value === "" ||
            event.target.value <= 0 ||
            event.target.value > 100
            ? price
            : Number(price) - (Number(event.target.value) / 100) * Number(price)
        )
      : setDiscountPrice(price);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (
      title.trim() !== "" &&
      category.trim() !== "" &&
      (discountRate === "" ||
        (Number(discountRate) >= 0 && Number(discountRate) <= 100)) &&
      price !== "" &&
      Number(price) >= 0 &&
      quantity !== "" &&
      Number(quantity) >= 0
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
      formData.append("tags", tags);
      axios({
        method: "put",
        url: `http://localhost:5000/products/update/${productId}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(
        (res) => {
          console.log(res.data);
          console.log("Res");
          setValid(true);
          alert("Successfully Updated Product.");
        },
        (err) => {
          setValid(false);
          alert("Product update was unsuccessful.\nError: " + err);
        }
      );
    } else {
      setValid(false);
    }
  };

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reply = {
      answer: formData.get("answer"),
      questionId: formData.get("questionId"),
    };
    console.log("formData");
    console.log(reply.questionId);
    console.log(reply.answer);
    axios
      .put(`http://localhost:5000/products/addAnswer/${productId}`, reply)
      .then(
        (res) => {
          navigate("/products/?add:");
          console.log(res.data);
        },
        (err) => {
          alert("Question was not submitted.\nError: " + err);
        }
      );
  };

  //TabbedPane
  const [tabValue, setTabValue] = React.useState(0);
  const [question, setQuestion] = React.useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    const questionData = {
      userName: "BIRA Builders and Suppliers",
      userId: userId,
      question: question,
    };
    if (questionAnswerData.length !== 0) {
      axios
        .put(
          `http://localhost:5000/products/addQuestion/${productId}`,
          questionData
        )
        .then(
          (res) => {
            navigate("/products/?add:");
            console.log(res.data);
          },
          (err) => {
            alert("Question was not submitted.\nError: " + err);
          }
        );
    } else {
      axios
        .post(
          `http://localhost:5000/products/createQuestionAnswer/${productId}`,
          questionData
        )
        .then(
          (res) => {
            navigate("/products/?add:");
            console.log(res.data);
          },
          (err) => {
            alert("Question was not submitted.\nError: " + err);
          }
        );
    }
  };

  return (
    <div id="root" style={styles.root}>
      <Toolbar />
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
                <FormControl fullWidth required defaultValue="">
                  <InputLabel id="demo-simple-select-label">
                    {category.trim() === "" && valid === false ? (
                      <span style={{ color: "#D32F2F" }}>Unfilled</span>
                    ) : (
                      "Category"
                    )}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    value={category}
                    label="category"
                    error={category === "" && valid === false}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="sofa">Sofa</MenuItem>
                    <MenuItem value="chair">Chair</MenuItem>
                    <MenuItem value="bed">Bed</MenuItem>
                    <MenuItem value="wardrobe">Wardrobe</MenuItem>
                    <MenuItem value="decoration">Decoration</MenuItem>
                    <MenuItem value="table">Table</MenuItem>
                    <MenuItem value="shelf">Shelf</MenuItem>
                    <MenuItem value="window">Window</MenuItem>
                    <MenuItem value="door">Door</MenuItem>
                    <MenuItem value="prefab">Prefab</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={5}>
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

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  name="price"
                  autoComplete="price"
                  label={
                    (price === "" || Number(price) < 0) && valid === false
                      ? price === ""
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
                  error={(price === "" || Number(price) < 0) && valid === false}
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
                    (quantity === "" || Number(quantity) < 0) && valid === false
                      ? quantity === ""
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
                    (quantity === "" || Number(quantity) < 0) && valid === false
                  }
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="discountRate"
                  name="discountRate"
                  autoComplete="discountRate"
                  label={
                    discountRate !== "" &&
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
                    discountRate !== "" &&
                    (Number(discountRate) < 0 || Number(discountRate) > 100) &&
                    valid === false
                  }
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <TextField
                  name="tags"
                  fullWidth
                  id="tags"
                  label="Tags"
                  autoFocus
                  value={tags}
                  onChange={handleTagsChange}
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
                  // style={{display: (image[0] !== undefined)? "none": "flex"}}
                ></input>
                <div
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    display: image[0] !== undefined ? "flex" : "none",
                  }}
                >
                  Current File: {image[0]}
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic1"
                  class="form-control"
                ></input>
                <div
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    display: image[1] !== undefined ? "flex" : "none",
                  }}
                >
                  Current File: {image[1]}
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic2"
                  class="form-control"
                ></input>
                <div
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    display: image[2] !== undefined ? "flex" : "none",
                  }}
                >
                  Current File: {image[2]}
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic3"
                  class="form-control"
                ></input>
                <div
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    display: image[3] !== undefined ? "flex" : "none",
                  }}
                >
                  Current File: {image[3]}
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic4"
                  class="form-control"
                ></input>
                <div
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    display: image[4] !== undefined ? "flex" : "none",
                  }}
                >
                  Current File: {image[4]}
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic5"
                  class="form-control"
                ></input>
                <div
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    display: image[5] !== undefined ? "flex" : "none",
                  }}
                >
                  Current File: {image[5]}
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  name="productPic6"
                  class="form-control"
                ></input>
                <div
                  style={{
                    fontSize: 13,
                    marginLeft: 5,
                    display: image[6] !== undefined ? "flex" : "none",
                  }}
                >
                  Current File: {image[6]}
                </div>
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
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { background: "brown" } }}
          >
            <Tab
              style={{ fontSize: 20 }}
              label="Details & Overview"
              index={0}
            />
            <Tab style={{ fontSize: 20 }} label="Product Reviews" index={1} />
            <Tab style={{ fontSize: 20 }} label="Product Questions" index={2} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
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
                rows={8}
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
                rows={8}
                style={{ marginTop: 15 }}
                name="specification"
                id="specification"
                value={specification}
                onChange={handleSpecificationChange}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <div
            style={styles.tabPanel}
          >
            <div
              style={{
                padding: 20,
                borderRadius: 3,
                fontSize: 18,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  ...{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  },
                  width: "70vw",
                }}
              >
                <div
                  style={{
                    padding: 20,
                    borderRadius: 3,
                    fontSize: 18,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <span style={{ fontSize: 30, color: "rgba(0,0,0,0.5)" }}>
                      <span style={{ fontSize: 45, color: "rgba(0,0,0,1)" }}>
                        {rating}
                      </span>
                      /5
                    </span>
                  </div>
                  <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    value={rating}
                    precision={0.5}
                    size={"large"}
                    readOnly
                  />
                  <span style={{ fontSize: 16, color: "rgba(0,0,0,0.7)" }}>
                    {"\u00A0"}
                    {reviewData.length} Reviews
                  </span>
                </div>
                <div
                  style={{
                    ...{
                      padding: 20,
                      borderRadius: 3,
                      fontSize: 18,
                      display: "flex",
                      flexDirection: "column",
                    },
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={5}
                      readOnly
                      size={"small"}
                    />
                    <div style={styles.ratingBar}>
                      <div
                        style={{
                          ...styles.ratingIndicator,
                          width: reviewsRating5,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: 12, marginLeft: 15 }}>
                      {reviewsRating5}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={4}
                      readOnly
                      size={"small"}
                    />
                    <div style={styles.ratingBar}>
                      <div
                        style={{
                          ...styles.ratingIndicator,
                          width: reviewsRating4,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: 12, marginLeft: 15 }}>
                      {reviewsRating4}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={3}
                      readOnly
                      size={"small"}
                    />
                    <div style={styles.ratingBar}>
                      <div
                        style={{
                          ...styles.ratingIndicator,
                          width: reviewsRating3,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: 12, marginLeft: 15 }}>
                      {reviewsRating3}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={2}
                      readOnly
                      size={"small"}
                    />
                    <div style={styles.ratingBar}>
                      <div
                        style={{
                          ...styles.ratingIndicator,
                          width: reviewsRating2,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: 12, marginLeft: 15 }}>
                      {reviewsRating2}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={1}
                      readOnly
                      size={"small"}
                    />
                    <div style={styles.ratingBar}>
                      <div
                        style={{
                          ...styles.ratingIndicator,
                          width: reviewsRating1,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: 12, marginLeft: 15 }}>
                      {reviewsRating1}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  borderBottom: "1px solid rgb(0,0,0,0.2)",
                }}
              >
                Users Reviews ({reviewData.length})
              </div>
              <div
                style={{
                  padding: 20,
                  borderRadius: 3,
                  fontSize: 18,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {reviewData.map((element) => (
                  <div
                    style={{
                      ...{
                        padding: 20,
                        borderRadius: 3,
                        fontSize: 18,
                        display: "flex",
                        flexDirection: "column",
                      },
                      borderBottom: "1px solid rgb(0,0,0,0.2)",
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={element.rating}
                      precision={0.5}
                      readOnly
                    />
                    <div style={{ textAlign: "justify" }}>
                      By {element.reviewerName},
                    </div>
                    <div style={{ textAlign: "justify" }}>
                      {element.reviewText}
                    </div>
                    <span
                      style={{
                        marginTop: 10,
                        ...{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          width: "100%",
                        },
                        fontSize: 14,
                        color: "#40aa40",
                      }}
                    >
                      <img
                        src={Icons.Verified}
                        style={{ width: 20, height: 20, marginRight: 5 }}
                        alt="Verified Icon"
                      />
                      Verified Purchase
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <div style={styles.tabPanel}>
            <div
              style={{
                padding: 20,
                borderRadius: 3,
                fontSize: 18,
                display: "flex",
                flexDirection: "column",
                width: "92%",
                marginTop: 8,
              }}
            >
              <TextField
                id="filled-textarea"
                label="Do you have any queries?"
                placeholder="Ask product related questions here."
                multiline
                variant="filled"
                rows="3"
                value={question}
                onChange={handleQuestionChange}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    borderRadius: "0px 0px 5px 5px",
                  }}
                  onClick={handleQuestionSubmit}
                >
                  ASK QUESTION
                </Button>
              </div>
              <div
                style={{
                  marginTop: 20,
                  borderBottom: "1px solid rgb(0,0,0,0.2)",
                }}
              >
                Other questions which have been answered ({answers})
              </div>
              {console.log(questionAnswerData)}

              {questionAnswerData.length !== 0 ? (
                questionAnswerData.map((element) => (
                  <div
                    style={{
                      padding: 20,
                      borderRadius: 3,
                      fontSize: 18,
                      display: "flex",
                      flexDirection: "column",
                      borderBottom: "1px solid rgb(0,0,0,0.2)",
                    }}
                  >
                    {console.log("element")}
                    {console.log(element)}
                    {console.log("element.answer")}
                    {console.log(element.answer)}
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        // alignItems: "center",
                        width: "100%",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={Icons.Question}
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 20,
                          marginTop: 5,
                        }}
                        alt="Question Icon"
                      />
                      <div style={{ textAlign: "justify" }}>
                        {element.question}
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                            fontSize: 14,
                            color: "rgba(0,0,0, 0.5)",
                          }}
                        >
                          {element.questioner} asked on{" "}
                          {element.date.slice(0, 10)}.
                        </span>
                      </div>
                    </span>

                    {element.answer !== undefined ? (
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          // alignItems: "center",
                          width: "100%",
                          alignItems: "flex-start",
                          marginTop: 10,
                        }}
                      >
                        <img
                          src={Icons.Answer}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 20,
                            marginTop: 5,
                          }}
                          alt="Answer Icon"
                        />
                        <div style={{ textAlign: "justify" }}>
                          {element.answer}
                          <br></br>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              width: "100%",
                              fontSize: 14,
                              color: "rgba(0,0,0, 0.5)",
                            }}
                          >
                            BIRA Builders & Suppliers
                          </span>
                        </div>
                      </span>
                    ) : (
                      <div style={{ marginTop: 15, width: "100%" }}>
                        <form onSubmit={handleAnswerSubmit} method="put">
                          <TextField
                            id="answer"
                            label="Answer"
                            placeholder="Give your reply here."
                            multiline
                            variant="filled"
                            rows="2"
                            style={{ width: "100%" }}
                            name="answer"
                            className="answer"
                          />
                          <TextField
                            name="questionId"
                            value={element._id}
                            style={{ display: "none" }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              width: "100%",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              size="large"
                              variant="contained"
                              sx={{
                                borderRadius: "0px 0px 5px 5px",
                              }}
                              type="submit"
                            >
                              Give Answer
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    <span
                      style={{
                        // display: "flex",
                        flexDirection: "row",
                        // alignItems: "center",
                        // background: '#f5f5c5',
                        width: "100%",
                        alignItems: "flex-start",
                        marginTop: 10,
                        display: element.answer === undefined ? "none" : "flex",
                      }}
                    >
                      <img
                        src={Icons.Answer}
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 20,
                          marginTop: 5,
                        }}
                        alt="Answer Icon"
                      />
                      <div style={{ textAlign: "justify" }}>
                        {element.answer}
                        <br></br>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            // background: '#f5f5c5',
                            width: "100%",
                            fontSize: 14,
                            color: "rgba(0,0,0, 0.5)",
                          }}
                        >
                          BIRA Builders & Suppliers
                        </span>
                      </div>
                    </span>
                  </div>
                ))
              ) : (
                <span style={{ marginTop: 20 }}>
                  No question has been asked yet.
                </span>
              )}
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
  ratingBar: {
    width: 100,
    height: 10,
    // border: '1px solid black',
    marginLeft: 15,
    display: "flex",
    justifyContent: "flex-start",
    background: "rgba(0,0,0, 0.15)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
  },
  ratingIndicator: {
    height: "100%",
    background: "#FAAF20",
  },
};

export default ProductUpdatePage;
