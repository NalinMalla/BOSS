import * as React from "react";

import NavButton from "./navButton";

import Colors from "../res/colors";

const NavButtonData = [
  {
    value: 'Product Catalog',
    url: '/productCatalog/',
  },
  {
    value: 'Custom Design',
    url: '/customDesign/',
  },
  {
    value: 'Prefab Construction',
    url: '/prefabConstruction/',
  },
  {
    value: 'Get To Know Us',
    url: '/aboutUs/',
  },
  {
    value: 'Careers',
    url: '/careers/',
  },
  {
    value: 'Customer Support',
    url: '/customerSupport/',
  },
];

const NavBar = () => {
  return (
    <div style={Styles.root}>
      {NavButtonData.map((element) => (
        <NavButton {...element} />
      ))}
    </div>
  );
};

const Styles = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: Colors.primary,
    height: 50,
  },
};

export default NavBar;
