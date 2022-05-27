// import { Link } from "@mui/material";

import Colors from "../res/colors";

export default function ProductCard(props) {
  return (
    <div style={{ ...Styles.root, ...props.style }}>
      <div
        style={{
          width: 196,
          height: 196,
          background: `url(${props.image})`,
          backgroundSize: "cover",
          borderRadius: "8px 8px 0px 0px",
          border: `1px solid ${Colors.primary}`,
        }}
      ></div>
      <div style={Styles.container}>
        <span style={Styles.text}>{props.title}</span>
        <span style={Styles.text}>
          <span
            style={{
              textDecoration: props.discountedPrice === 0 ? "none" : "line-through",
              marginRight: props.discountedPrice === 0 ? 0 : 5,
            }}
          >
            {props.price}
          </span>
          <span>{props.discountedPrice}</span>
        </span>
      </div>
    </div>
  );
}

ProductCard.defaultProps = {
  price: 0,
  discountedPrice: 0,
  style: {},
};

const Styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: 196,
    height: 254,
    borderRadius: "8px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  container: {
    backgroundColor: Colors.primary,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    alignItems: "center",
    color: "#FFFFFFFF",
    height: 58,
    borderRadius: "0px 0px 8px 8px",
    border: `1px solid ${Colors.primary}`,
  },
  text: {
    width: "90%",
    height: "50%",
    marginTop: 2,
    marginBottom: 2,
  },
};
