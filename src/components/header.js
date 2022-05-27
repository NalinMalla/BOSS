import * as React from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
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
        <div style={styles.motto}>Excellence with Elegance</div>
      </div>

      <div style={styles.rightContainer}>
        <SearchInput />
        
        <IconButton color="primary" title="Tagged Items" aria-label="Tagged Items" sx={{marginRight: 1, marginTop: 4 }} >
          <AssistantPhotoIcon />
        </IconButton>
        <IconButton color="primary" title="Cart" aria-label="shopping cart" sx={{marginRight: 1, marginTop: 4 }}>
          <ShoppingCartIcon />
        </IconButton>
        <AvatarMenu handleSignIn={props.handleSignIn}/>

      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flex: 1,
    width: '95%',
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
