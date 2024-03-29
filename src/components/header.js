import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import FlagIcon from "@mui/icons-material/Flag";
import Badge from "@mui/material/Badge";

import SearchInput from "../components/searchInput";
import AvatarMenu from "../components/avatarMenu";

import Colors from "../res/colors";
import Icons from "../res/icons";

const Header = (props) => {
  // console.log(localStorage.getItem("userTaggedItem").slice(1));
  const [userTaggedItem] = React.useState(
    localStorage.getItem("userId") !== "undefined" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userTaggedItemId") !== undefined &&
      localStorage.getItem("userTaggedItemId") !== null
      ? localStorage.getItem("userTaggedItem") === ""
        ? []
        : localStorage.getItem("userTaggedItem").slice(1).split(",")
      : []
  );

  console.log("userTaggedItem");
  console.log(userTaggedItem);

  const [userCart] = React.useState(
    localStorage.getItem("userId") !== "undefined" &&
      localStorage.getItem("userId") !== undefined &&
      localStorage.getItem("userId") !== null &&
      localStorage.getItem("userCartId") !== undefined &&
      localStorage.getItem("userCartId") !== null
      ? JSON.parse(localStorage.getItem("userCart"))
      : []
  );

  // React.useEffect(() => {
  //   if(userTaggedItem[0] === "")
  //   {
  //     userTaggedItem.shift();
  //   }
  // }, [userTaggedItem])

  return (
    <div style={styles.root}>
      <div style={styles.wrapper}>
        <div style={styles.leftContainer}>
          <a href="/" style={{ marginBottom: -7 }}>
            <img src={Icons.Logo} alt="Logo" style={styles.logo} />
          </a>
          <div style={styles.motto}>Excellence with Elegance</div>
        </div>

        <div style={styles.rightContainer}>
          <SearchInput />

          <IconButton
            color="primary"
            title="Tagged Items"
            aria-label="Tagged Items"
            sx={{ marginRight: 1, marginTop: 4 }}
            href="/profile/taggedItem"
          >
            <Badge badgeContent={userTaggedItem.length} color="secondary">
              <FlagIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="primary"
            title="Cart"
            aria-label="shopping cart"
            sx={{ marginRight: 1, marginTop: 4 }}
            href="/cart"
          >
            <Badge badgeContent={userCart.length} color="success">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <AvatarMenu handleSignIn={props.handleSignIn} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    background: "#FFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  wrapper: {
    display: "flex",
    width: "95%",
    paddingTop: 2,
    paddingBottom: 1,
    justifyContent: "space-between",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    height: "13vh",
    paddingBottom: 5,
  },
  motto: {
    display: "flex",
    fontFamily: "Antic Slab, Helvetica, Calibre",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 20,
    marginTop: 32,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};

export default Header;
