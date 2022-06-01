import React from "react";
import { Button } from "@mui/material";
import Colors from "../res/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

const NavButton = (props) => {
  function MouseOver(event) {
    event.target.style.background = "#FFF";
    event.target.style.color = Colors.primary;
  }
  function MouseOut(event) {
    event.target.style.background = Colors.primary;
    event.target.style.color = "#FFF";
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(Boolean(null));
  const handleClick = (event) => {
    setIsMenuOpen(event.currentTarget);
  };
  const handleClose = () => {
    setIsMenuOpen(null);
  };

  return (
    <div>
      <Button
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
        style={styles.button}
        onClick={handleClick}
      >
        {props.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={isMenuOpen}
        open={isMenuOpen}
        onClose={handleClose}
        MenuListPropss={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {props.menu.map((element) => {
          console.log(element);
          return (
            <MenuItem
              onClick={() => {
                window.location = element.url;
              }}
            >
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText>{element.title}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

NavButton.defaultProps = {
  menu: [],
};

const styles = {
  root: {},
  button: {
    height: 45,
    border: "0px",
    borderRadius: "0px 0px 5px 5px",
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: Colors.primary,
    fontSize: 15,
    color: "white",
    transition: "all .34s ease",
    WebkitTransition: "all .34s ease",
    MozTransition: "all .34s ease",
  },
};

export default NavButton;
