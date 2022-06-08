import Rating from "@mui/material/Rating";
import FlagIcon from "@mui/icons-material/Flag";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from "@mui/material";

import Counter from "../components/productCounter";

import Colors from "../res/colors";
import Images from "../res/images";

export default function ProductCard2(props) {
  return (
    <div
      style={{ ...Styles.root, ...props.style }}
    >
      <img
        style={{
          width: 100,
          height: 100,
          backgroundSize: "cover",
          borderRadius: "8px 0px 0px 8px",
        }}
        src={props.image.src}
        alt={props.image.alt}
      />
      <div style={{ ...Styles.container, flex: 0.4, marginTop: -15, }}>
        <span style={{ fontSize: 20, fontWeight: 500 }}>
          {props.title}
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

      <div style={{ ...Styles.container, flex: 0.2 }}>
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
              color:
                props.discountPrice == null ? "#000" : "rgba(0,0,0,0.4)",
            }}
          >
            Rs.{props.price}
          </span>
          <span
            style={{
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            {props.discountRate}
          </span>
        </span>
        <span>
          <IconButton style={{ marginLeft: -10 }}>
            <FlagIcon color="none" style={{ width: 23, height: 23 }} />
          </IconButton>
          <IconButton style={{ marginLeft: 10 }}>
            <ShoppingCartIcon color="primary" style={{ width: 23, height: 23 }} />
          </IconButton>
        </span>
      </div>

      <div style={{ ...Styles.container, flex: 0.2 }}>
        <Counter
          discountPrice={props.discountPrice}
          price={props.price}
          style={{ fontSize: 18, marginTop: 0 }}
          buttonStyle={{ size: "small", marginLeft: 32, marginRight: 10 }}
        />
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
    background: '#FFF'
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
