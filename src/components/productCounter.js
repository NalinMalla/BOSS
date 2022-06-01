import React, { useState} from "react";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

import Colors from "../res/colors";

const Counter = (props) => {
  const [count, setCount] = useState(props.initialCount);

  let price= 0;
  if(props.discountPrice == null)
  {
    price = props.price;
  }
  else{
    price = props.discountPrice;
  }

  const increaseCount = (increment = 1) => {
    setCount(count + increment);
  };

  const decreaseCount = (decrement = 1) => {
    if(count===1)
    {
      setCount(1)
    }
    else
    {
      setCount(count - decrement);
    }
  };

  let subtotal = price * count;


  return (
    <div style={styles.root}>
      <div style={{ fontSize: 22, color: Colors.primary }}>
        Subtotal: {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}Rs. {subtotal}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <span style={{ fontSize: 22, color: Colors.primary }}>Quantity:</span>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          style={{ display: "flex", alignItems: "center", marginLeft: 40 }}
        >
          <Button
            onClick={() => {
              decreaseCount();
            }}
          >
            -
          </Button>
          <span
            style={{
              fontSize: 20,
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
  initialCount: 0,
};

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-around",
  },
};

Counter.defaultProps = {
  initialCount: 1,
  price: 0,
  discountPrice: null,
};

export default Counter;
