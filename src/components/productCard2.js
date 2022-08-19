import * as React from "react";
import Rating from "@mui/material/Rating";
import FlagIcon from "@mui/icons-material/Flag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import Counter from "../components/productCounter";

import Colors from "../res/colors";

export default function ProductCard2(props) {
  const userId = localStorage.getItem("userId");
  const userTaggedItem =
    localStorage.getItem("userId") !== "undefined" &&
    localStorage.getItem("userId") !== undefined &&
    localStorage.getItem("userId") !== null
      ? localStorage.getItem("userTaggedItem").split(",")
      : [];
  const userTaggedItemId = localStorage.getItem("userTaggedItemId");
  const userCartId = localStorage.getItem("userCartId");
  const userCart =
  localStorage.getItem("userId") !== "undefined" &&
  localStorage.getItem("userId") !== undefined &&
  localStorage.getItem("userId") !== null
    ? JSON.parse(localStorage.getItem("userCart"))
    : [];
  // const userCart = JSON.parse(localStorage.getItem("userCart"));
  const [productId] = React.useState(props._id);
  console.log(productId);

  const [isTagged] = React.useState(
    userTaggedItem.includes(props._id) ? true : false
  );

  const userCartItem = userCart.map((x) => x.productId);

  const [isInCart] = React.useState(
    userCartItem.includes(props._id) ? true : false
  );

  const [count, setCount] = React.useState(props.count);

  React.useEffect(() => {
    for (let i = 0; i < userCart.length; i++) {
      if (
        userCart[i].productId === productId &&
        userCart[i].count !== count &&
        count !== undefined
      ) {
        console.log("count");
        console.log(count);

        localStorage.setItem("userCart", JSON.stringify(userCart.splice(i, 1)));
        localStorage.setItem(
          "userCart",
          JSON.stringify([...userCart, { productId: productId, count: count }])
        );
      }
    }
  }, [count]);

  const handleClickTaggedItem = (event) => {
    // event.preventDefault();

    if (isTagged !== true) {
      console.log("isTagged !== true");
      axios
        .put(`http://localhost:5000/users/taggedItem/add/${userId}`, {
          productId,
        })
        .then(
          (res) => {
            localStorage.setItem(
              "userTaggedItem",
              localStorage.getItem("userTaggedItem") + "," + productId
            );
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      console.log("isTagged === true");
      axios
        .put(
          `http://localhost:5000/users/taggedItem/delete/${userTaggedItemId}`,
          { productId }
        )
        .then(
          (res) => {
            console.log(res);
            localStorage.setItem(
              "userTaggedItem",
              localStorage
                .getItem("userTaggedItem")
                .replace(`,${productId}`, "")
            );

            console.log(localStorage.getItem("userTaggedItem") === productId);

            if (localStorage.getItem("userTaggedItem") === productId) {
              localStorage.setItem("userTaggedItem", "");
            }

            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  const handleClickCart = (event) => {
    if (isInCart !== true) {
      console.log("isInCart !== true");
      axios
        .put(`http://localhost:5000/users/cart/add/${userId}`, {
          product: { productId: productId, count: 1 },
        })
        .then(
          (res) => {
            localStorage.setItem(
              "userCart",
              JSON.stringify([...userCart, { productId: productId, count: 1 }])
            );
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      console.log("isInCart === true");
      axios
        .put(`http://localhost:5000/users/cart/delete/${userCartId}`, {
          productId,
        })
        .then(
          (res) => {
            for (let i = 0; i < userCart.length; i++) {
              if (userCart[i].productId === productId) {
                userCart.splice(i, 1);
                localStorage.setItem("userCart", JSON.stringify(userCart));
              }
            }
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    }
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
      <div style={{ ...Styles.container, flex: 0.3, marginTop: -10 }}>
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

      <div style={{ ...Styles.container, flex: 0.28 }}>
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
          <IconButton
            style={{ marginLeft: -20 }}
            onClick={handleClickTaggedItem}
          >
            <FlagIcon
              color={isTagged ? "primary" : "none"}
              style={{ width: 23, height: 23 }}
            />
          </IconButton>
          <IconButton
            style={{ marginLeft: 10 }}
            onClick={() => {
              window.location = `/product/?${productId}`;
            }}
          >
            <LibraryBooksIcon
              color="primary"
              style={{ width: 23, height: 23 }}
            />
          </IconButton>
          <IconButton style={{ marginLeft: 10 }} onClick={handleClickCart}>
            <ShoppingCartIcon
              color={isInCart ? "primary" : "none"}
              style={{ width: 23, height: 23 }}
            />
          </IconButton>
        </span>
      </div>

      <div style={{ ...Styles.container, flex: 0.28 }}>
        {props.counterDisplay === "none" ? (
          <div
            style={{
              marginRight: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<LibraryBooksIcon />}
              onClick={() => {
                window.location = `/product/?${productId}`;
              }}
            >
              View Details
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              style={{ marginTop: 8 }}
              onClick={handleClickCart}
            >
              {isInCart ? "Undo Cart" : "Add To Cart"}
            </Button>
            {/* <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              style={{ marginTop: 8 }}
              onClick={handleClickTaggedItem}
            >
              {isTagged ? "Remove Tag" : "Tag This Item"}
            </Button> */}
          </div>
        ) : (
          <Counter
            discountPrice={props.discountPrice}
            price={props.price}
            style={{ fontSize: 18, marginTop: 0 }}
            buttonStyle={{ size: "small", marginLeft: 32, marginRight: 10 }}
            disabled={props.counterDisabled}
            display={props.counterDisplay}
            initialCount={count}
            handleUpdate={setCount}
            quantity={props.quantity}
          />
        )}
      </div>
    </div>
  );
}

const Styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
