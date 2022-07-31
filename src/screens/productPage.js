import React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";
import Rating from "@mui/material/Rating";
import { Button, IconButton } from "@mui/material";

import Colors from "../res/colors";
import Images from "../res/images";

import Header from "../components/header";
import NavBar from "../components/navBar";
import Carousel from "../components/carousel";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import {TabbedPane} from "../components/tabs";
import Counter from "../components/productCounter";

const ProductPage = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const productData = {
    deals: "FURNITURE MANIA",
    title: "Brown Kasmir Sofa",
    rating: 3.5,
    reviewsRating5: 5,
    reviewsRating4: 83,
    reviewsRating3: 150,
    reviewsRating2: 69,
    reviewsRating1: 0,
    reviews: 307,
    questions: 26,
    answers: 12,
    price: 102000,
    discountPrice: 100000,
    discountRate: "-2%",
    image: [
      {
        src: Images.SofaBrown,
        alt: "SofaBrown",
      },
      {
        src: Images.Chair,
        alt: "Chair",
      },
    ],
    description: [
      "In the chicest shade of brown, Calion sofa’s linen-weave upholstery complements so many color schemes and aesthetics. Flared arms, prominent welting and flamestitch-print pillows add just enough panache to this sweet and simple sofa. Supportive seat cushions make for one comfortable landing pad.",

      "Corner-blocked frame",

      "Attached back and loose seat cushions",

      "High-resiliency foam cushions wrapped in thick poly fiber",

      "Body & Cushion Fabric: Polyester (100)%",
    ],
    specification: [
      'Length: 28.00"',
      'Width: 87.00"',
      'Height: 28.00"',
      "Weight: 61.69 kg",
      'Seat depth: 22.00"',
      'Seat height: 19.00"',
      'Distance between arms: 69.00"',
      'Top of cushion to top of back: 18.00"',
      'Arm height: 26.00"',
      'Minimum width of doorway for delivery: 32.00"',
    ],
    reviewData:[
      {
        rating: 4,
        reviewer: 'Nalin Malla',
        review: 'Very cozy sofa. The product built and quality of material is excellent. The brown color of the sofa matches perfectly with my side table set.'
      },
      {
        rating: 3.5,
        reviewer: 'Jojan Rai',
        review: 'Nice sofa. The brown color of the sofa matches perfectly with my side table set. The product built and quality of material is excellent.'
      },
    ],
    questionAnswerData: [
      {
        questioner: 'Nalin Malla',
        date: new Date(),
        question: 'How is the built quality?',
        answer: 'Very cozy sofa. The product built and quality of material is excellent.',
      },
      {
        questioner: 'Jojan Rai',
        date: new Date(),
        question: 'How long will it take to deliver?',
        answer: 'Depending on where you live from 2-5 days.',
      },
    ]
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
            carouselStyle={{ borderRadius: 3,}}
          >
            {productData.image.map((element) => (
              <img
                style={{ width: "100%", height: "70vh" }}
                src={element.src}
                alt={element.alt}
              />
            ))}
          </Carousel>
        </div>
        <div style={{ display: "flex", flex: 0.07 }}></div>
        <div style={styles.control}>
          <span
            style={{ fontSize: 20, fontWeight: "bold", color: Colors.primary }}
          >
            {productData.deals}
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex", fontSize: 35, flexWrap: "wrap" }}>
              {productData.title}
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
                <FlagIcon color="primary" style={{ width: 35, height: 35 }} />
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
              display: productData.discountPrice == null ? "none" : "flex",
              marginTop: 20,
            }}
          >
            Rs.{productData.discountPrice}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: productData.discountPrice == null ? 20 : 0,
            }}
          >
            <span
              style={{
                textDecoration:
                  productData.discountPrice == null ? "none" : "line-through",
                fontSize: productData.discountPrice == null ? 32 : 20,

                color:
                  productData.discountPrice == null
                    ? "#000"
                    : "rgba(0,0,0,0.4)",
              }}
            >
              Rs.{productData.price}
            </span>
            <span
              style={{
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              {productData.discountRate}
            </span>
          </span>

          <Counter
            discountPrice={productData.discountPrice}
            price={productData.price}
            style={{ fontSize: 22, marginTop: 20 }}
            buttonStyle={{ marginLeft: 40, marginRight: 0 }}
          />
          <div style={{ display: "flex", marginTop: 40, alignItems: "center" }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              style={{ fontSize: 18 }}
            >
              Buy Now
            </Button>
            {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            <Button
              fullWidth
              size="large"
              variant="contained"
              style={{ fontSize: 18 }}
            >
              Add to Cart
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
        description={productData.description}
        specification={productData.specification}
        rating={productData.rating}
        reviews={productData.reviews}
        reviewsRating5= {productData.reviewsRating5}
        reviewsRating4= {productData.reviewsRating4}
        reviewsRating3= {productData.reviewsRating3}
        reviewsRating2= {productData.reviewsRating2}
        reviewsRating1= {productData.reviewsRating1}
        reviewData = {productData.reviewData}
        answers = {productData.answers}
        questions = {productData.questions}
        questionAnswerData= {productData.questionAnswerData}
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
