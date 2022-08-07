import * as React from "react";

import ProductCard2 from "./productCard2";

import Images from "../res/images";

const ProductListData = [
  {
    title: "Brown Kasmir Sofa",
    rating: 3.5,
    price: 102000,
    discountPrice: 100000,
    discountRate: "-2%",
    image: {
      src: Images.SofaBrown,
      alt: "SofaBrown",
    },
  },
  {
    title: "Ergonomic Chair",
    rating: 1,
    price: 7000,
    discountedPrice: null,
    image: {
      src: Images.Chair,
      alt: "SofaBrown",
    },
  },
  {
    title: "Ply Wood Table",
    rating: 4,
    price: 20000,
    discountPrice: null,
    discountRate: null,
    image: {
      src: Images.Table,
      alt: "SofaBrown",
    },
  },
];
const ProductList = (props) => {
  return (
    <div style={Styles.container}>
      {ProductListData.map((element) => (
        <ProductCard2 {...element} style={Styles.card} counterDisabled={props.counterDisabled} counterDisplay={props.counterDisplay} />
      ))}
    </div>
  );
};

const Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: '100%',
  },
  card: {
    marginBottom: 20,
  },
};
export default ProductList;
