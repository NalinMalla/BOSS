import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';

import SearchInput from "../components/searchInput";
import AvatarMenu from "../components/avatarMenu";

import Colors from "../res/colors";
import Images from "../res/images";

const Header = (props) => {
  return (
    <div style={styles.root}>
      <div style={styles.leftContainer}>
        <a href="/" style={{marginBottom: -7 }}>
          <img src={Images.Logo} alt="Logo" style={styles.logo} />
        </a>
        <div style={styles.motto}>Elegance with Excellence</div>
      </div>

      <div style={styles.rightContainer}>
        <SearchInput />
        
        <IconButton color="primary" aria-label="favorite" sx={{marginRight: 1, marginTop: 4 }} >
          <AssistantPhotoIcon />
        </IconButton>
        <IconButton color="primary" aria-label="shopping cart" sx={{marginRight: 1, marginTop: 4 }}>
          <ShoppingCartIcon />
        </IconButton>
        <AvatarMenu/>

      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 2,
    paddingBottom: 1,
    // borderRadius: '0px 0px 8px 8px',
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    height: "14vh",
  },
  motto: {
    display: "flex",
    fontFamily: "Antic Slab, Helvetica, Calibre",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 10,
    marginTop: 34,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};

export default Header;