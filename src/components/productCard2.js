import Rating from "@mui/material/Rating";
import FlagIcon from "@mui/icons-material/Flag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import Counter from "../components/productCounter";

import Colors from "../res/colors";
import Images from "../res/images";

export default function ProductCard2(props) {
  const handleClickTaggedItem = (event) => {
    event.preventDefault();

  const userId = localStorage.getItem("userId");

    axios.put(`http://localhost:5000/users/taggedItem/add/${userId}`, props._id).then(
      (res) => {
        storeInfoToLocalStorage(userId);
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div style={{ ...Styles.root, ...props.style }}>
      <img
        style={{
          width: 100,
          height: 100,
          backgroundSize: "cover",
          borderRadius: "8px 0px 0px 8px",
        }}
        src={"http://localhost:5000/" + props.image[0]}
      />
      <div style={{ ...Styles.container, flex: 0.4, marginTop: -10 }}>
        <span style={{ fontSize: 20, fontWeight: 500 }}>{props.title}</span>
        <span
          style={{ fontSize: 12, fontWeight: 500, color: Colors.secondary }}
        >
          {props.deals}
        </span>

        <div style={{ ...Styles.wrapper, marginTop: 8 }}>
          <span style={{ fontSize: 14, color: Colors.primary }}>
            Rating: {"\u00A0"}
          </span>
          <Rating
            name="half-rating-read"
            defaultValue={0}
            value={props.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </div>
      </div>

      <div style={{ ...Styles.container, flex: 0.25 }}>
        <span
          style={{
            fontSize: 18,
            display: props.discountPrice == null ? "none" : "flex",
            fontWeight: 500,
          }}
        >
          Rs.{props.discountPrice}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: props.discountPrice == null ? 16 : 0,
          }}
        >
          <span
            style={{
              textDecoration:
                props.discountPrice == null ? "none" : "line-through",
              fontSize: props.discountPrice == null ? 18 : 16,
              fontWeight: props.discountPrice == null ? 500 : "medium",
              marginTop: props.discountPrice == null ? -14 : 0,
              color: props.discountPrice == null ? "#000" : "rgba(0,0,0,0.4)",
            }}
          >
            Rs.{props.price}
          </span>
          <span
            style={{
              fontSize: 16,
              marginLeft: 8,
              color: "#ee0000",
              display: props.discountRate === null ? "none" : "flex",
            }}
          >
            -{props.discountRate}%
          </span>
        </span>
        <span>
          <IconButton style={{ marginLeft: -10 }}>
            <FlagIcon color="none" style={{ width: 23, height: 23 }} />
          </IconButton>
          <IconButton style={{ marginLeft: 10 }}>
            <ShoppingCartIcon
              color="primary"
              style={{ width: 23, height: 23 }}
            />
          </IconButton>
        </span>
      </div>

      <div style={{ ...Styles.container, flex: 0.25 }}>
        {props.counterDisplay === "none" ? (
          <div
            style={{
              marginRight: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined" startIcon={<ShoppingCartIcon />}>
              Add To Cart
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              style={{ marginTop: 8 }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Counter
            discountPrice={props.discountPrice}
            price={props.price}
            style={{ fontSize: 18, marginTop: 0 }}
            buttonStyle={{ size: "small", marginLeft: 32, marginRight: 10 }}
            disabled={props.counterDisabled}
            display={props.counterDisplay}
          />
        )}
      </div>
    </div>
  );
}

ProductCard2.defaultProps = {
  price: 0,
  discountedPrice: 0,
  image: Images.Bed,
  title: "Product Title",
};

const Styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // height: 100,
    borderRadius: "8px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: "#FFF",
  },
  wrapper: {
    display: "flex",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    width: "90%",
    height: "50%",
    marginTop: 2,
    marginBottom: 2,
  },
};
