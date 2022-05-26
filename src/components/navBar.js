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
    width: '100%',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    
    // marginLeft: 60,
    // marginRight: 60,
    // borderRadius: '0px 0px 8px 8px',
  },
};

export default NavBar;
