import * as React from "react";
import NavButton from "./navButton";

import Colors from "../res/colors";
import Icons from "../res/icons";

const NavButtonData = [
  {
    title: "Product Catalog",
    menu: [
      {
        title: 'All',
        url: "categories/prefab",
        icon: (
          <img
            alt="Product Catalog"
            src={Icons.All}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'Sofa',
        url: "categories/sofa",
        icon: (
          <img
            alt="Sofa"
            src={Icons.Sofa}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Chair',
        url: "categories/chair",
        icon: (
          <img
            alt="Chair"
            src={Icons.Chair}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Bed',
        url: "categories/bed",
        icon: (
          <img
            alt="Bed"
            src={Icons.Bed}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Wardrobe',
        url: "categories/wardrobe",
        icon: (
          <img
            alt="Wardrobe"
            src={Icons.Wardrobe}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Decoration',
        url: "categories/decoration",
        icon: (
          <img
            alt="Decoration"
            src={Icons.Decoration}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Table',
        url: "categories/table",
        icon: (
          <img
            alt="Table"
            src={Icons.Table}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Shelf',
        url: "categories/shelf",
        icon: (
          <img
            alt="Shelf"
            src={Icons.Shelf}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Window',
        url: "categories/window",
        icon: (
          <img
            alt="Window"
            src={Icons.Window}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Door',
        url: "categories/door",
        icon: (
          <img
            alt="Door"
            src={Icons.Door}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },

      {
        title: 'Prefab',
        url: "categories/prefab",
        icon: (
          <img
            alt="Prefab"
            src={Icons.Prefab}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
    ],
  },
  {
    title: "Custom Design",
    url: "/customDesign/",
  },
  {
    title: "Prefab Construction",
    url: "/prefabConstruction/",
  },
  {
    title: "Get To Know Us",
    url: "/aboutUs/",
    menu: [
      {
        title: 'Our Company',
        url: "aboutUs/company",
        icon: (
          <img
            alt="Company"
            src={Icons.Company}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'Our Designs',
        url: "aboutUs/designs",
        icon: (
          <img
            alt="Designs"
            src={Icons.Design}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'Our Projects',
        url: "aboutUs/projects",
        icon: (
          <img
            alt="Prefab"
            src={Icons.Prefab}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'Our Team',
        url: "aboutUs/team",
        icon: (
          <img
            alt="Team"
            src={Icons.Team}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'Connect With Us',
        url: "aboutUs/contact",
        icon: (
          <img
            alt="Contact"
            src={Icons.Network}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
    ],
  },
  {
    title: "Careers",
    url: "/careers/",
    menu: [
      {
        title: 'Join',
        url: "careers/join",
        icon: (
          <img
            alt="Join"
            src={Icons.Handshake}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'Internship',
        url: "careers/internship",
        icon: (
          <img
            alt="Internship"
            src={Icons.Internship}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
    ],

  },
  {
    title: "Customer Support",
    url: "/customerSupport/",
    menu: [
      {
        title: 'Help Center',
        url: "customerSupport/help",
        icon: (
          <img
            alt="Help Center"
            src={Icons.CustomerSupport}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'FAQ',
        url: "customerSupport/faq",
        icon: (
          <img
            alt="FAQ"
            src={Icons.FAQ}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
      {
        title: 'Feedback',
        url: "customerSupport/feedback",
        icon: (
          <img
            alt="Feedback"
            src={Icons.Feedback}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      },
    ],
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
