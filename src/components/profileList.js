import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import InventoryIcon from "@mui/icons-material/Inventory";
import CancelIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FlagIcon from '@mui/icons-material/Flag';
import { Link } from "@mui/material";

export default function ProfileList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      style={{
        width: "100%",
        backgroundColor: "#FFF",
        marginTop: 20,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      component="nav"
      aria-labelledby="filter-list"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AccountBoxIcon style={{ height: 25, width: 25 }} />
        </ListItemIcon>
        <ListItemText primary="Manage My Profile" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/profile/" underline="none" style={{ color: "#000" }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PersonIcon style={{ height: 25, width: 25, marginTop: -2 }} />
              </ListItemIcon>
              <ListItemText primary="User Profile" />
            </ListItemButton>
          </Link>

          <Link href="/profile/addressBook" underline="none" style={{ color: "#000" }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ShareLocationIcon
                  style={{ height: 25, width: 25, marginTop: -2 }}
                />
              </ListItemIcon>
              <ListItemText primary="Address Book" />
            </ListItemButton>
          </Link>

          <Link
            href="/profile/paymentOptions"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AccountBalanceWalletIcon
                  style={{ height: 25, width: 25, marginTop: -2 }}
                />
              </ListItemIcon>
              <ListItemText primary="Payment Options" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <Divider />
      <Link href="/profile/taggedItem" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <FlagIcon style={{ height: 25, width: 25, marginTop: -2 }} />
          </ListItemIcon>
          <ListItemText primary="My Tagged Items" />
        </ListItemButton>
      </Link>

      <Link href="/profile/orders" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon style={{ height: 25, width: 25, marginTop: -2 }} />
          </ListItemIcon>
          <ListItemText primary="My Orders" />
        </ListItemButton>
      </Link>

      <Link href="/profile/orders/cancellations" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <CancelIcon style={{ height: 25, width: 25, marginTop: -2 }} />
          </ListItemIcon>
          <ListItemText primary="My Cancellations" />
        </ListItemButton>
      </Link>

      <Link href="/profile/orders/returns" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <RestartAltIcon style={{ height: 25, width: 25, marginTop: -2 }} />
          </ListItemIcon>
          <ListItemText primary="My Returns" />
        </ListItemButton>
      </Link>

      <Link href="/profile/reviews" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <StarBorderPurple500Icon
              style={{ height: 25, width: 25, marginTop: -2 }}
            />
          </ListItemIcon>
          <ListItemText primary="My Reviews" />
        </ListItemButton>
      </Link>
    </List>
  );
}
