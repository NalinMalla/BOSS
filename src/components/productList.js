import * as React from "react";

import ProductCard2 from "./productCard2";

import Colors from "../res/colors";

const ProductList = (props) => {

  let products = props.products;
  // let products = JSON.parse(props.products);

  return (
    <div style={Styles.container}>
      {products[0] !== undefined ? (
        products.map((element) => (
          <ProductCard2
            {...element}
            style={Styles.card}
            counterDisabled={props.counterDisabled}
            counterDisplay={props.counterDisplay}
          />
        ))
      ) : (
        <span
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 500,
            color: Colors.primary,
          }}
        >
          Items Not Found
        </span>
      )}
    </div>
  );
};

const Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  card: {
    marginBottom: 20,
  },
};

ProductList.defaultProps = {
  products: [],
};

export default ProductList;
