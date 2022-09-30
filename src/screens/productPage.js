import React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";
import Rating from "@mui/material/Rating";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Colors from "../res/colors";

import Carousel from "../components/carousel";
import { TabbedPane } from "../components/tabs";
import Counter from "../components/productCounter";

const ProductPage = () => {
  const productId = window.location.href.split("?")[1];

  const userId = localStorage.getItem("userId");
  const userTaggedItem =
    localStorage.getItem("userId") !== "undefined" &&
    localStorage.getItem("userId") !== undefined &&
    localStorage.getItem("userId") !== null
      ? localStorage.getItem("userTaggedItem").split(",")
      : [];
  const userTaggedItemId = localStorage.getItem("userTaggedItemId");
  const userCartId = localStorage.getItem("userCartId");
  const userCart =
    localStorage.getItem("userId") !== "undefined" &&
    localStorage.getItem("userId") !== undefined &&
    localStorage.getItem("userId") !== null
      ? JSON.parse(localStorage.getItem("userCart"))
      : [];

  const [isTagged] = React.useState(
    userTaggedItem.includes(productId) ? true : false
  );

  const userCartItem = userCart.map((x) => x.productId);

  const [isInCart] = React.useState(
    userCartItem.includes(productId) ? true : false
  );


  const [deals, setDeals] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [count, setCount] = React.useState(1);
  const [quantity, setQuantity] = React.useState("");
  const [discountRate, setDiscountRate] = React.useState("");
  const [description, setDescription] = React.useState([]);
  const [specification, setSpecification] = React.useState([]);
  const [image, setImage] = React.useState([]);
  const [discountPrice, setDiscountPrice] = React.useState("");

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

  let navigate = useNavigate();

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
      setDeals(productInfo.deals);
      setTitle(productInfo.title);
      setPrice(productInfo.price);
      setQuantity(productInfo.quantity);
      setDiscountPrice(productInfo.discountPrice);
      if (productInfo.discountRate !== undefined) {
        setDiscountRate(productInfo.discountRate);
      }

      if (productInfo.description !== undefined) {
        setDescription(productInfo.description.split(/\r?\n/));
      }

      if (productInfo.specification !== undefined) {
        setSpecification(productInfo.specification.split(/\r?\n/));
      }

      setImage(productInfo.image);
    }

    const questionAnswer = await getQuestionAnswerDataById(productId);
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
      navigate("/");
    } else {
      initializeProductData(productId); //wouldn't work without async await?
    }
  }, []);

  const handleClickTaggedItem = (event) => {
    if (isTagged !== true) {
      axios
        .put(`http://localhost:5000/users/taggedItem/add/${userId}`, {
          productId,
        })
        .then(
          (res) => {
            localStorage.setItem(
              "userTaggedItem",
              localStorage.getItem("userTaggedItem") + "," + productId
            );
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      axios
        .put(
          `http://localhost:5000/users/taggedItem/delete/${userTaggedItemId}`,
          { productId }
        )
        .then(
          (res) => {
            console.log(res);
            localStorage.setItem(
              "userTaggedItem",
              localStorage
                .getItem("userTaggedItem")
                .replace(`,${productId}`, "")
            );

            console.log(localStorage.getItem("userTaggedItem") === productId);

            if (localStorage.getItem("userTaggedItem") === productId) {
              localStorage.setItem("userTaggedItem", "");
            }

            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  const handleClickCart = (event) => {
    if (isInCart !== true) {
      axios
        .put(`http://localhost:5000/users/cart/add/${userId}`, {
          product: { productId: productId, count: count },
        })
        .then(
          (res) => {
            localStorage.setItem(
              "userCart",
              JSON.stringify([
                ...userCart,
                { productId: productId, count: count },
              ])
            );
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      axios
        .put(`http://localhost:5000/users/cart/delete/${userCartId}`, {
          productId,
        })
        .then(
          (res) => {
            for (let i = 0; i < userCart.length; i++) {
              if (userCart[i].productId === productId) {
                userCart.splice(i, 1);
                localStorage.setItem("userCart", JSON.stringify(userCart));
              }
            }
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  return (
    <div id="root" style={styles.root}>
      <div style={styles.container}>
        <div style={{ display: "flex", flex: 0.53 }}>
          <Carousel
            width="100%"
            transformWidth="100"
            delay="1700"
            indicatorsStyle={{ visibility: "hidden" }}
            carouselStyle={{ borderRadius: 3 }}
          >
            {image.map((element) => (
              <img
                style={{ width: "100%", height: "70vh" }}
                src={"http://localhost:5000/" + element}
              />
            ))}
          </Carousel>
        </div>
        <div style={{ display: "flex", flex: 0.07 }}></div>
        <div style={styles.control}>
          <span
            style={{ fontSize: 20, fontWeight: "bold", color: Colors.primary }}
          >
            {deals}
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex", fontSize: 35, flexWrap: "wrap" }}>
              {title}
            </span>
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton style={{ marginRight: 18 }}>
                <ShareIcon color="none" style={{ width: 30, height: 30 }} />
              </IconButton>
              <IconButton>
                <FlagIcon
                  color={isTagged ? "primary" : "none"}
                  style={{ width: 35, height: 35 }}
                  onClick={handleClickTaggedItem}
                />
              </IconButton>
            </span>
          </span>
          <div style={{ display: "flex", marginTop: 10, alignItems: "center" }}>
            <span style={{ fontSize: 20, color: Colors.primary }}>
              Rating: {"\u00A0"}
            </span>
            <Rating
              name="half-rating-read"
              defaultValue={0}
              value={rating}
              precision={0.5}
              readOnly
            />
          </div>
          <span>
            {reviewData.length} Reviews | {questionAnswerData.length} Questions{" "}
            {answers} Answer
          </span>
          <span
            style={{
              fontSize: 32,
              display: discountRate === "" ? "none" : "flex",
              marginTop: 20,
            }}
          >
            Rs.{discountPrice}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: discountRate === "" ? 20 : 0,
            }}
          >
            <span
              style={{
                textDecoration: discountRate === "" ? "none" : "line-through",
                fontSize: discountRate === "" ? 32 : 20,

                color: discountRate === "" ? "#000" : "rgba(0,0,0,0.4)",
              }}
            >
              Rs.{price}
            </span>
            <span
              style={{
                fontSize: 20,
                marginLeft: 10,
                color: "#ee0000",
                display: discountRate === "" ? "none" : "flex",
              }}
            >
              -{discountRate}%
            </span>
          </span>

          <Counter
            discountPrice={discountPrice}
            price={price}
            style={{ fontSize: 22, marginTop: 20 }}
            buttonStyle={{ marginLeft: 40, marginRight: 0 }}
            handleUpdate={setCount}
            quantity={quantity}
          />
          <div
            style={{
              display: quantity < 11 ? "flex" : "none",
              marginTop: 20,
              alignItems: "center",
              color: "#ee0000",
            }}
          >
            ** Only {quantity} {title} left. **
          </div>
          <div style={{ display: "flex", marginTop: 30, alignItems: "center" }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              style={{ fontSize: 18 }}
              onClick={() => {
                window.location = `/checkout/?${productId}&${count}`;
              }}
            >
              Buy Now
            </Button>
            {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            <Button
              fullWidth
              size="large"
              variant="contained"
              style={{ fontSize: 18 }}
              onClick={handleClickCart}
            >
              {isInCart ? "Undo Cart" : "Add to Cart"}
            </Button>
          </div>
        </div>
        <div></div>
      </div>

      <TabbedPane
        style={{
          marginTop: 60,
          width: "80%",
          background: "#FFF",
          borderRadius: 3,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
        description={description}
        specification={specification}
        rating={rating}
        reviews={reviewData.length}
        reviewsRating5={reviewsRating5}
        reviewsRating4={reviewsRating4}
        reviewsRating3={reviewsRating3}
        reviewsRating2={reviewsRating2}
        reviewsRating1={reviewsRating1}
        reviewData={reviewData}
        validReviewers={validReviewers}
        answers={answers}
        questionAnswerData={questionAnswerData}
        productId={productId}
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
    flex: 0.4,
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
};

export default ProductPage;
