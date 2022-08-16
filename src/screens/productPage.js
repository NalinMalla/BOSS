import React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";
import Rating from "@mui/material/Rating";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Colors from "../res/colors";
import Images from "../res/images";

import Header from "../components/header";
import NavBar from "../components/navBar";
import Carousel from "../components/carousel";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import { TabbedPane } from "../components/tabs";
import Counter from "../components/productCounter";

const ProductPage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const productId = window.location.href.split("?")[1];

  const userId = localStorage.getItem("userId");
  const userTaggedItem = localStorage.getItem("userTaggedItem").split(",");
  const userTaggedItemId = localStorage.getItem("userTaggedItemId");
  const userCartId = localStorage.getItem("userCartId");
  const userCart = JSON.parse(localStorage.getItem("userCart"));

  const [isTagged] = React.useState(
    userTaggedItem.includes(productId) ? true : false
  );

  const userCartItem = userCart.map((x) => x.productId);

  const [isInCart] = React.useState(
    userCartItem.includes(productId) ? true : false
  );

  console.log("isInCart");
  console.log(isInCart);

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
    console.log("questionAnswerData get");
    console.log(questionAnswer);
    if (questionAnswer !== null) {
      setQuestionAnswerData(questionAnswer.questionAnswerData.reverse());
      setAnswers(questionAnswer.answers);
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
    // event.preventDefault();

    if (isTagged !== true) {
      console.log("isTagged !== true");
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
      console.log("isTagged === true");
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
      console.log("isInCart !== true");
      axios
        .put(`http://localhost:5000/users/cart/add/${userId}`, {
          product: { productId: productId, count: count },
        })
        .then(
          (res) => {
            localStorage.setItem(
              "userCart",
              JSON.stringify([...userCart, { productId: productId, count: count }])
            );
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      console.log("isInCart === true");
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

  const productData = {
    rating: 3.5,
    reviewsRating5: 5,
    reviewsRating4: 83,
    reviewsRating3: 150,
    reviewsRating2: 69,
    reviewsRating1: 0,
    reviews: 307,
    questions: 26,
    answers: 12,
    reviewData: [
      {
        rating: 4,
        reviewer: "Nalin Malla",
        review:
          "Very cozy sofa. The product built and quality of material is excellent. The brown color of the sofa matches perfectly with my side table set.",
      },
      {
        rating: 3.5,
        reviewer: "Jojan Rai",
        review:
          "Nice sofa. The brown color of the sofa matches perfectly with my side table set. The product built and quality of material is excellent.",
      },
    ],
  };

  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
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
                <FlagIcon color={(isTagged)? "primary": "none"} style={{ width: 35, height: 35 }} onClick={handleClickTaggedItem}/>
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
              value={productData.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <span>
            {productData.reviews} Reviews | {productData.questions} Questions{" "}
            {productData.answers} Answer
          </span>
          <span
            style={{
              fontSize: 32,
              display: discountPrice === "" ? "none" : "flex",
              marginTop: 20,
            }}
          >
            Rs.{discountPrice}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: discountPrice === "" ? 20 : 0,
            }}
          >
            <span
              style={{
                textDecoration: discountPrice === "" ? "none" : "line-through",
                fontSize: discountPrice === "" ? 32 : 20,

                color: discountPrice === "" ? "#000" : "rgba(0,0,0,0.4)",
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
              {isInCart ? "Undo Cart":"Add to Cart"}
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
        rating={productData.rating}
        reviews={productData.reviews}
        reviewsRating5={productData.reviewsRating5}
        reviewsRating4={productData.reviewsRating4}
        reviewsRating3={productData.reviewsRating3}
        reviewsRating2={productData.reviewsRating2}
        reviewsRating1={productData.reviewsRating1}
        reviewData={productData.reviewData}
        answers={answers}
        questionAnswerData={questionAnswerData}
        productId={productId}
      />

      <div style={styles.wrapper}>
        <SiteMap />
        <Copyright />
      </div>

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        component={<SignIn />}
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
    // border : '1px solid black',
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  titleUnderline: {
    height: 3,
    backgroundColor: Colors.biraRed,
    marginTop: 5,
  },
};

export default ProductPage;
