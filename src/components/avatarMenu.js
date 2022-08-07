import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import CancelIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

import Colors from "../res/colors";

export default function AvatarMenu(props) {
  const [profilePic] = React.useState(
    localStorage.getItem("userProfilePic") !== "undefined" &&
      localStorage.getItem("userProfilePic") !== undefined
      ? localStorage.getItem("userProfilePic")
      : ""
  );

  const [userId] = React.useState(localStorage.getItem("userId"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signUp");
  };
  console.log("typeof profilePic");
  console.log(typeof profilePic);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="User Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mt: 4 }}
            aria-controls={open ? "avatar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {profilePic === "" ? (
              <Avatar
                sx={{ width: 28, height: 28, backgroundColor: Colors.primary }}
              >
                <PersonIcon sx={{ width: 20, height: 20 }} />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: Colors.primary,
                }}
              >
                <img
                  src={"http://localhost:5000/" + profilePic}
                  style={{ width: 30, height: 30 }}
                />
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {userId == null ? (
        <Menu
          anchorEl={anchorEl}
          id="avatar-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleSignUp}>
            <ListItemIcon>
              <CreateIcon fontSize="small" />
            </ListItemIcon>
            Sign Up
          </MenuItem>

          <MenuItem onClick={props.handleSignIn}>
            <ListItemIcon>
              <LockOpenIcon fontSize="small" />
            </ListItemIcon>
            Sign In
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          id="avatar-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              window.location = "/profile";
            }}
          >
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location = "/profile/orders";
            }}
          >
            <ListItemIcon>
              <InventoryIcon fontSize="small" />
            </ListItemIcon>
            My Orders
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location = "/profile/orders/cancellations";
            }}
          >
            <ListItemIcon>
              <CancelIcon fontSize="small" />
            </ListItemIcon>
            My Cancellations
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location = "/profile/orders/returns";
            }}
          >
            <ListItemIcon>
              <RestartAltIcon fontSize="small" />
            </ListItemIcon>
            My Returns
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location = "/profile/reviews";
            }}
          >
            <ListItemIcon>
              <StarBorderPurple500Icon fontSize="small" />
            </ListItemIcon>
            My Reviews
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              window.location = "/settings";
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location = "/logout";
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </React.Fragment>
  );
}
