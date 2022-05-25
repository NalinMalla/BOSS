import * as React from "react";
import Link from "@mui/material/Link";

import Images from "../res/images";
import Colors from "../res/colors";

export default function Copyright() {
  return (
    <div style={Styles.root}>
      <div style={Styles.leftContainer}>
        <span>
          {"Copyright © "}
          {new Date().getFullYear()}
          {" "}
          <Link color="inherit" href="https://bira.com.np/" underline="hover">
            BIRA Builders & Suppliers PVT. LTD.
          </Link>
          {" All rights reserved."}
          <Link
            color="rgba(255,255,255,0.9)"
            href="#"
            underline="hover"
            style={{ fontWeight: "normal", marginLeft: 30 }}
          >
            Privacy Policy
          </Link>
        </span>
      </div>

      <div style={Styles.rightContainer}>
        <a href="/" style={{ marginBottom: -7 }}>
          <img src={Images.Logo} alt="Logo" style={Styles.logo} />
        </a>
      </div>
    </div>
  );
}

const Styles = {
  root: {
    display: "flex",
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 20,
    paddingBottom: 60,
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    fontSize: 13,
    fontWeight: 3,
    color: "rgba(255,255,255, 0.7)",
  },
  logo: {
    height: "10vh",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};
