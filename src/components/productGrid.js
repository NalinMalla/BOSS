import * as React from "react";

import ProductCard from "./productCard";

import Images from "../res/images";

const ProductCardData = [
  {
    title: "Grey Sofa",
    image: Images.SofaBrown,
    price: "Rs.30,000",
    url: "product",
  },
  {
    title: "Ergonomic Chair",
    image: Images.Chair,
    price: "Rs.99,99,999",
    discountedPrice: "Rs.10,00,000",
    url: "product",
  },
  {
    title: "Brown Bed",
    image: Images.Bed,
    price: "Rs.30,000",
    url: "product"
  },
  {
    title: "Ply Wood Table",
    image: Images.Table,
    price: "Rs. 20,000",
    url: "product",
  },
  {
    title: "Wooden Shelf",
    image: Images.Shelf,
    price: "Rs.30,000",
    url: "product",
  },
  {
    title: "Green Door",
    image: Images.Door,
    price: "Rs.20,000",
    url: "product",
  },
  {
    title: "Green Door",
    image: Images.Door,
    price: "Rs.20,000",
    url: "product",
  },
  {
    title: "Green Door",
    image: Images.Door,
    price: "Rs.20,000",
    url: "product",
  },
  {
    title: "Ply Wood Table",
    image: Images.Table,
    price: "Rs. 20,000",
    url: "product",
  },
  {
    title: "Ply Wood Table",
    image: Images.Table,
    price: "Rs. 20,000",
    url: "product",
  },
  {
    title: "Ply Wood Table",
    image: Images.Table,
    price: "Rs. 20,000",
    url: "product",
  },
];
const ProductCarousel = () => {
  return (
    <div style={Styles.container}>
    {ProductCardData.map((element) => (
      <ProductCard {...element} style= {Styles.card}/>
    ))}
  </div>
  );
};

const Styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginLeft: "2.5%",
    marginRight: "2.5%",
    flexWrap: "wrap",
  },
  card: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
};
export default ProductCarousel;
