import * as React from "react";
import axios from "axios";

import Carousel, { CarouselItem } from "../components/carousel";
import CategoriesGrid from "../components/categoriesGrid";
import ServicesOffered from "../components/servicesOffered";
import AboutCompany from "../components/aboutCompany";
import ProductCarousel from "../components/productCarousel";

import Images from "../res/images";
import Colors from "../res/colors";

const HomePage = () => {
  const [popularProducts, setPopularProducts] = React.useState([]);
  const [hotProducts, setHotProducts] = React.useState([]);
  const OfferCarouselData = [
    {
      children: (
        <a href="search/?all:mania" style={{ width: "100%", height: "80vh" }}>
          <img
            style={{ width: "100%", height: "80vh" }}
            src={Images.FurnitureManiaOffer}
            alt="Furniture Mania Offer"
          />
        </a>
      ),
    },

    {
      children: (
        <a href="search/?all:mega" style={{ width: "100%", height: "80vh" }}>
          <img
            style={{ width: "100%", height: "80vh" }}
            src={Images.BigSaleOffer}
            alt="Big Sale Offer"
          />
        </a>
      ),
    },

    {
      children: (
        <a href="search/?all:offer" style={{ width: "100%", height: "80vh" }}>
          <img
            style={{ width: "100%", height: "80vh" }}
            src={Images.WhyDiwaliOffer}
            alt="Why only in Diwali Offer"
          />
        </a>
      ),
    },
  ];

  const DesignCarouselData = [
    {
      children: (
        <img
          style={{ width: "100%" }}
          src={Images.HomeDesign}
          alt="Home Design"
        />
      ),
    },
    {
      children: (
        <img
          style={{ width: "100%" }}
          src={Images.HomeDesign}
          alt="Home Design"
        />
      ),
    },
    {
      children: (
        <img
          style={{ width: "100%" }}
          src={Images.HomeDesign}
          alt="Home Design"
        />
      ),
    },
  ];

  axios
    .get(`http://localhost:5000/products/ten/popular`)
    .then((response) => setPopularProducts(response.data))
    .catch();

  axios
    .get(`http://localhost:5000/products/ten/hotDeals`)
    .then((response) => setHotProducts(response.data))
    .catch();
  // React.useEffect(async () => {
  //   await axios
  //     .get(`http://localhost:5000/products/all/popular`)
  //     .then((response) => setPopularProducts(response.data))
  //     .catch();
  //   await axios
  //     .get(`http://localhost:5000/products/all/hotDeals`)
  //     .then((response) => setHotProducts(response.data))
  //     .catch();
  // }, []);

  return (
    <div id="root" style={Styles.root}>
      <Carousel width="100%" transformWidth="100" delay="1700">
        {OfferCarouselData.map((element) => (
          <CarouselItem {...element} />
        ))}
      </Carousel>
      <ServicesOffered />
      <div style={Styles.container}>
        <span style={Styles.title}>BROWSE CATEGORIES</span>
        <div style={{ ...Styles.titleUnderline, width: 220 }}></div>
      </div>
      <CategoriesGrid />

      <Carousel
        width="100%"
        transformWidth="100"
        carouselStyle={{ marginTop: 60 }}
        delay="2500"
      >
        {DesignCarouselData.map((element) => (
          <CarouselItem {...element} />
        ))}
      </Carousel>

      <div style={Styles.container}>
        <span style={Styles.title}>MOST POPULAR</span>
        <div style={{ ...Styles.titleUnderline, width: 170 }}></div>
      </div>

      <ProductCarousel products={popularProducts} />

      <div style={Styles.container}>
        <span style={Styles.title}>HOT DEALS</span>
        <div style={{ ...Styles.titleUnderline, width: 120 }}></div>
      </div>
      <ProductCarousel products={hotProducts} />

      <AboutCompany />
    </div>
  );
};

const Styles = {
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
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 650,
    color: Colors.primary,
  },
  titleUnderline: {
    height: 3,
    backgroundColor: Colors.biraRed,
    marginTop: 5,
  },
};

export default HomePage;
