import React from "react";
import axios from "axios";

import Rating from "@mui/material/Rating";

import Colors from "../res/colors";

export default function ProductCard(props) {
  // console.log(props._id);
  const [reviewDataLength, setReviewDataLength] = React.useState(0);

  axios
      .get(`http://localhost:5000/products/review/${props._id}`)
      .then((response) => {
        if(response.data.reviewData.length>0){
          // console.log(response.data.reviewData);
          setReviewDataLength(response.data.reviewData.length)
        }
      })
      .catch();
  // function MouseOver(event) {
  //   event.target.style.boxShadow =
  //   event.target.className === "container" &&
  //   "4px 6px 4px rgba(0, 0, 0, 0.5)";
  // }
  // function MouseOut(event) {
  //   event.target.style.boxShadow = "none";
  // }
  return (
    <a
      style={{ ...Styles.root, ...props.style, textDecoration: "none" }}
      // onMouseOver={MouseOver}
      // onMouseOut={MouseOut}
      href= {`/product/?${props._id}`}
    >
      <img
        style={{
          width: 196,
          height: 196,
          backgroundSize: "cover",
          borderRadius: "8px 8px 0px 0px",
          border: `1px solid ${Colors.primary}`,
          // marginLeft: "0.25px"
        }}
        src={"http://localhost:5000/" + props.image[0]}
      />
      <div style={Styles.container}>
        <span style={Styles.text}>{props.title}</span>
        <span
          style={{
            ...Styles.text,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Rs.{props.discountRate === undefined || props.discountRate === 0
            ? props.price
            : props.discountPrice}

          <span
            style={{
              display:
                props.discountRate === undefined || props.discountRate === 0
                  ? "none"
                  : "flex",
              color: "#F43",
              marginLeft: 10,
            }}
          >
            -{props.discountRate}%
          </span>
        </span>
        <span style={{
            ...Styles.text,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Rating
            name="half-rating-read"
            defaultValue={0}
            value={props.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <span style={{marginLeft:10}}>({reviewDataLength})</span>
        </span>

        
      </div>
    </a>
  );
}

ProductCard.defaultProps = {
  price: 0,
  discountPrice: 0,
};

const Styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 196,
    // height: 254,
    height: 264,
    borderRadius: "8px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  container: {
    backgroundColor: Colors.primary,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#FFFFFFFF",
    // height: 58,
    height: 68,
    borderRadius: "0px 0px 8px 8px",
    border: `1px solid ${Colors.primary}`,
  },
  text: {
    width: "90%",
    height: "50%",
    marginTop: .75,
  },
};
