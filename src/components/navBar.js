import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Divider } from "@mui/material";
import NavButton from "./navButton";

import Colors from "../res/colors";
import Icons from "../res/icons";

const NavButtonData = [
  {
    value: "Product Catalog",
    url: "/productCatalog/",
    menu: [
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/prefab";
            }}
          >
            <ListItemIcon>
              <img
                alt="Product Catalog"
                src={Icons.All}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>All</ListItemText>
          </MenuItem>
            
        ),
      },
    
      {
        children: <Divider />,
      },
    
      {
        children: (
          <span style={{ textDecoration: "underline" }}>Categories</span>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/sofa";
            }}
          >
            <ListItemIcon>
              <img
                alt="Sofa"
                src={Icons.Sofa}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Sofa</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/chair";
            }}
          >
            <ListItemIcon>
              <img
                alt="Chair"
                src={Icons.Chair}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Chair</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/bed";
            }}
          >
            <ListItemIcon>
              <img
                alt="Bed"
                src={Icons.Bed}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Bed</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/wardrobe";
            }}
          >
            <ListItemIcon>
              <img
                alt="Wardrobe"
                src={Icons.Wardrobe}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Wardrobe</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/decoration";
            }}
          >
            <ListItemIcon>
              <img
                alt="Decoration"
                src={Icons.Decoration}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Decoration</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/table";
            }}
          >
            <ListItemIcon>
              <img
                alt="Table"
                src={Icons.Table}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Table</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/shelf";
            }}
          >
            <ListItemIcon>
              <img
                alt="Shelf"
                src={Icons.Shelf}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Shelf</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/window";
            }}
          >
            <ListItemIcon>
              <img
                alt="Window"
                src={Icons.Window}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Window</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/door";
            }}
          >
            <ListItemIcon>
              <img
                alt="Door"
                src={Icons.Door}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Door</ListItemText>
          </MenuItem>
        ),
      },
    
      {
        children: (
          <MenuItem
            onClick={() => {
              window.location = "categories/prefab";
            }}
          >
            <ListItemIcon>
              <img
                alt="Prefab"
                src={Icons.Prefab}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </ListItemIcon>
            <ListItemText>Prefab</ListItemText>
          </MenuItem>
        ),
      },
    ]
  },
  {
    value: "Custom Design",
    url: "/customDesign/",
  },
  {
    value: "Prefab Construction",
    url: "/prefabConstruction/",
  },
  {
    value: "Get To Know Us",
    url: "/aboutUs/",
  },
  {
    value: "Careers",
    url: "/careers/",
  },
  {
    value: "Customer Support",
    url: "/customerSupport/",
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
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

    // marginLeft: 60,
    // marginRight: 60,
    // borderRadius: '0px 0px 8px 8px',
  },
};

export default NavBar;
