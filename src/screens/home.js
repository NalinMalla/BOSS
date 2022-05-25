import * as React from "react";

import Header from "../components/header";
import NavBar from "../components/navBar";
import Carousel from "../components/carousel";
import ServicesOffered from "../components/servicesOffered";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";

const Home = () => {
  return (
    <div id="root" style={Styles.root}>
      <Header/>   
      <NavBar/>
      <Carousel/>
      <ServicesOffered/>
      <SiteMap/>
      <Copyright/>
    </div>
  );
};

const Styles = {
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};

export default Home;
