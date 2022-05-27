import * as React from "react";
import Colors from "../res/colors";

import Header from "../components/header";
import NavBar from "../components/navBar";
// import Carousel from "../components/carousel";
import CategoriesGrid from "../components/categoriesGrid";
import ServicesOffered from "../components/servicesOffered";
import AboutCompany from "../components/aboutCompany";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn"
import CustomModal from "../components/CustomModal";
import ProductGrid from "../components/productGrid";

import Images from "../res/images";

const Home = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  return (
    <div id="root" style={Styles.root}>
      <Header handleSignIn={handleOpenModal}/>
      <NavBar />
      {/* <Carousel/> */}
      <img
        style={{ width: "100%", height: "65%", marginTop: 10 }}
        src={Images.ExchangeOffer1}
        alt="OnlineShopping"
      ></img>
      <ServicesOffered />
      <div style={Styles.container}>
        <span style={Styles.title}>BROWSE CATEGORIES</span>
        <div style={{ ...Styles.titleUnderline, width: 220 }}></div>
      </div>
      <CategoriesGrid />
      <img
        style={{ width: "100%", marginTop: 80 }}
        src={Images.HomeDesign}
        alt="Home Design"
      ></img>
      <div style={Styles.container}>
        <span style={Styles.title}>MOST POPULAR</span>
        <div style={{ ...Styles.titleUnderline, width: 170 }}></div>
      </div>
      <ProductGrid/>
      
      <div style={Styles.container}>
        <span style={Styles.title}>HOT DEALS</span>
        <div style={{ ...Styles.titleUnderline, width: 120 }}></div>
      </div>
      <ProductGrid/>

      <AboutCompany />
      <div style={Styles.wrapper}>
        <SiteMap />
        <Copyright />
      </div>

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        component= {<SignIn />}
      />
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
      flexDirection: 'column',
      width: '100%',
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

export default Home;
