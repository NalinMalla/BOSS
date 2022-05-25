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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import SignIn from "../components/signIn"
import CustomModal from "../components/CustomModal";

import Colors from "../res/colors";

export default function AccountMenu() {
  const [signIn, setSignIn] = React.useState(false);
  const handleOpenSignIn = () => setSignIn(true);
  const handleCloseSignIn = () => setSignIn(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const reveal = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mt: 4,  }}
            aria-controls={reveal ? "avatar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={reveal ? "true" : undefined}
          >
            <Avatar sx={{ width: 28, height: 28, backgroundColor: Colors.primary}}>
              <PersonIcon sx={{ width: 20, height: 20}}/>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="avatar-menu"
        reveal={reveal}
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
        <MenuItem  onClick={handleOpenSignIn}>
          <ListItemIcon >
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <CustomModal
        signIn={signIn}
        onClose={handleCloseSignIn}
        component= {<SignIn />}
      />
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <InventoryIcon fontSize="small" />
          </ListItemIcon>
          My Orders
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CancelIcon fontSize="small" />
          </ListItemIcon>
          My Cancellations
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <RestartAltIcon fontSize="small" />
          </ListItemIcon>
          My Returns
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <StarBorderPurple500Icon fontSize="small" />
          </ListItemIcon>
          My Reviews
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
