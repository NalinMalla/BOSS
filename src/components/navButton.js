import * as React from "react";
import { Button, Divider } from "@mui/material";
import Colors from "../res/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import Icons from "../res/icons";

export const NavMenuItem = ({ children, style }) => {
  return (
    <div className="nav-menu-item" style={{  ...style }}>
      {children}
    </div>
  );
};

const NavButton = (prop) => {
  function MouseOver(event) {
    event.target.style.background = "#FFF";
    event.target.style.color = Colors.primary;
  }
  function MouseOut(event) {
    event.target.style.background = Colors.primary;
    event.target.style.color = "#FFF";
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
        style={{
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
        }}
        // onClick={() => {window.location = 'categories/all'}}
        onClick={handleClick}
      >
        {prop.value}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // style={{marginTop: 5}}
        // PaperProps={{
        //   elevation: 0,
        //   sx: {
        //     overflow: 'visible',
        //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //     mt: 1.5,
        //     '& .MuiAvatar-root': {
        //       width: 32,
        //       height: 32,
        //       ml: -0.5,
        //       mr: 1,
        //     },
        //     '&:before': {
        //       content: '""',
        //       display: 'block',
        //       position: 'absolute',
        //       top: 0,
        //       right: '45%',
        //       width: 10,
        //       height: 10,
        //       bgcolor: 'background.paper',
        //       transform: 'translateY(-50%) rotate(45deg)',
        //       zIndex: 0,
        //     },
        //   },
        // }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {console.log(prop.menu)}
        <MenuItem onClick={() => {window.location = 'categories/all'}}>
          <ListItemIcon>
            <img alt="Product Catalog" src={Icons.All} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>All</ListItemText>
        </MenuItem>
        <Divider/>
        <MenuItem style={{textDecoration: 'underline'}}>Categories</MenuItem>
        <MenuItem onClick={() => {window.location = 'categories/sofa'}}>
          <ListItemIcon>
            <img alt="Sofa" src={Icons.Sofa} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Sofa</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/chair'}}>
          <ListItemIcon>
          <img alt="Chair" src={Icons.Chair} style={{width:25, height:25, marginRight: 20}}/>

          </ListItemIcon>
          <ListItemText>Chair</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/bed'}}>
          <ListItemIcon>
          <img alt="Bed" src={Icons.Bed} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Bed</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/wardrobe'}}>
          <ListItemIcon>
          <img alt="Wardrobe" src={Icons.Wardrobe} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Wardrobe</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/decoration'}}>
          <ListItemIcon>
          <img alt="Decoration" src={Icons.Decoration} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Decoration</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/table'}}>
          <ListItemIcon>
          <img alt="Table" src={Icons.Table} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Table</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/shelf'}}>
          <ListItemIcon>
          <img alt="Shelf" src={Icons.Shelf} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Shelf</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/window'}}>
          <ListItemIcon>
          <img alt="Window" src={Icons.Window} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Window</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/door'}}>
          <ListItemIcon>
          <img alt="Door" src={Icons.Door} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Door</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => {window.location = 'categories/prefab'}}>
          <ListItemIcon>
          <img alt="Prefab" src={Icons.Prefab} style={{width:25, height:25, marginRight: 20}}/>
          </ListItemIcon>
          <ListItemText>Prefab</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavButton;
