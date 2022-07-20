import * as React from "react";

import ProductCard from "./productCard";
import Carousel, { CarouselItem } from "./carousel";

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
    <Carousel
      width="16.666667%"
      transformWidth="16.666667"
      carouselStyle = {{marginTop: 32,}}
      innerDivStyle={{  width: '95%'}}
      delay="2000"
      arrayLength = {ProductCardData.length}
      indicatorsStyle = {{visibility: 'hidden'}}
    >
      {ProductCardData.map((element) => (
        <CarouselItem>
          <ProductCard {...element} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
