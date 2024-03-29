import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Icons from "../res/icons";
import { Divider } from "@mui/material";
import PriceSlider from "./priceSlider";
import { Link } from "@mui/material";

export default function FilterList(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      style={{
        width: "100%",
        maxWidth: 280,
        backgroundColor: "#FFF",
        marginTop: 20,
      }}
      component="nav"
      aria-labelledby="filter-list"
      subheader={
        <ListSubheader
          component="div"
          id="filter-list"
          style={{ fontSize: 16 }}
        >
          Filter Menu
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemIcon>
          <img
            src={Icons.PriceFilter}
            style={{ height: 30, width: 30, marginTop: -2 }}
            alt="PriceFilter"
          />
        </ListItemIcon>
        <ListItemText primary="Price Filter" />
      </ListItem>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 15,
          marginTop: -5,
        }}
      >
        <PriceSlider
          setMaxValue={props.setMaxPrice}
          setMinValue={props.setMinPrice}
        />
      </div>

      <Divider />
      <Link href="/search/?trending" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <img
              src={Icons.Trending}
              style={{ height: 25, width: 25, marginTop: -10 }}
              alt="trending"
            />
          </ListItemIcon>
          <ListItemText primary="Trending Products" />
        </ListItemButton>
      </Link>

      <Link href="/search/?hotDeals" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <img
              src={Icons.HotSale}
              style={{ height: 25, width: 25, marginTop: -10 }}
              alt="hot sale"
            />
          </ListItemIcon>
          <ListItemText primary="Hot Deals" />
        </ListItemButton>
      </Link>

      <Link href="/search/?popular" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <img
              src={Icons.Popular}
              style={{ height: 25, width: 25, marginTop: -10 }}
              alt="popular"
            />
          </ListItemIcon>
          <ListItemText primary="Popular Products" />
        </ListItemButton>
      </Link>

      <Link href="/search/?all" underline="none" style={{ color: "#000" }}>
        <ListItemButton>
          <ListItemIcon>
            <img
              src={Icons.All}
              style={{ height: 25, width: 25, marginTop: -10 }}
              alt="all"
            />
          </ListItemIcon>
          <ListItemText primary="All Products" />
        </ListItemButton>
      </Link>

      <Divider />

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <img
            src={Icons.Category}
            style={{ height: 22, width: 22, marginTop: -10 }}
            alt="category"
          />
        </ListItemIcon>
        <ListItemText primary="Product Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            href="/search/?categories/sofa"
            underline="none"
            style={{ color: "#000" }}
          >
            {" "}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Sofa}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="sofa"
                />
              </ListItemIcon>
              <ListItemText primary="Sofa" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/chair"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Chair}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="chair"
                />
              </ListItemIcon>
              <ListItemText primary="Chair" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/bed"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Bed}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="bed"
                />
              </ListItemIcon>
              <ListItemText primary="Bed" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/wardrobe"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Wardrobe}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="wardrobe"
                />
              </ListItemIcon>
              <ListItemText primary="Wardrobe" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/decoration"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Decoration}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="Decoration"
                />
              </ListItemIcon>
              <ListItemText primary="Decoration" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/table"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Table}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="Table"
                />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/shelf"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Shelf}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="Shelf"
                />
              </ListItemIcon>
              <ListItemText primary="Shelf" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/window"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Window}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="Window"
                />
              </ListItemIcon>
              <ListItemText primary="Window" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/door"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Door}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="Door"
                />
              </ListItemIcon>
              <ListItemText primary="Door" />
            </ListItemButton>
          </Link>
          <Link
            href="/search/?categories/prefab"
            underline="none"
            style={{ color: "#000" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <img
                  src={Icons.Prefab}
                  style={{ height: 25, width: 25, marginTop: -4 }}
                  alt="Prefab"
                />
              </ListItemIcon>
              <ListItemText primary="Prefab" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <Divider />
    </List>
  );
}
