import React, { useState} from "react";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

import Colors from "../res/colors";

const Counter = (props) => {
  const [count, setCount] = useState(props.initialCount);

  let price= 0;
  if(props.discountPrice === "")
  {
    price = props.price;
  }
  else{
    price = props.discountPrice;
  }

  const handleChange = (value) => {
    setCount(value);
    props.handleUpdate(value);
  }
  const increaseCount = (increment = 1) => {
    handleChange(count + increment);
  };

  const decreaseCount = (decrement = 1) => {
    if(count > 1)
    {
      handleChange(count - decrement);
    }
  };

  let subtotal = price * count;


  return (
    <div style={{...styles.root, marginTop: props.style.marginTop, display: props.display}}>
      <div style={{ fontSize: props.style.fontSize, color: Colors.primary }}>
        Subtotal: {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}Rs. {subtotal}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <span style={{ fontSize: props.style.fontSize, color: Colors.primary }}>Quantity:</span>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          style={{ display: "flex", alignItems: "center", marginLeft: props.buttonStyle.marginLeft, marginRight: props.buttonStyle.marginRight }}
          size= {props.buttonStyle.size}
        >
          <Button
            onClick={() => {
              decreaseCount();
            }}
            disabled= {props.disabled}
          >
            -
          </Button>
          <span
            style={{
              fontSize: props.style.fontSize,
              color: Colors.primary,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {count}
          </span>
          <Button
            onClick={() => {
              increaseCount();
            }}
            disabled= {props.disabled}
          >
            +
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

Counter.defaultProps = {
  title: "Counter",
  subtitle: "Subtitle",
  disabled: false,
  initialCount: 1,
  price: 0,
  discountPrice: null,
};

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-around",
  },
};

Counter.defaultProps = {
  initialCount: 1,
  handleChange : (value) => {
  }
}

export default Counter;
