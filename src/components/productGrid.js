import * as React from "react";

import ProductCard from "./productCard";
import Carousel, { CarouselItem } from "./carousel";

import Images from "../res/images";

const ProductCardData = [
  {
    title: "Grey Sofa",
    image: Images.SofaBrown,
    price: "Rs.30,000",
    url: "product/sofa",
  },
  {
    title: "Ergonomic Chair",
    image: Images.Chair,
    price: "Rs.99,99,999",
    discountedPrice: "Rs.10,00,000",
    url: "product/chair",
  },
  {
    title: "Brown Bed",
    image: Images.Bed,
    price: "Rs.30,000",
    url: "product/bed",
  },
  {
    title: "Ply Wood Table",
    image: Images.Table,
    price: "Rs. 20,000",
    url: "product/table",
  },
  {
    title: "Wooden Shelf",
    image: Images.Shelf,
    price: "Rs.30,000",
    url: "category/shelf",
  },
  {
    title: "Green Door",
    image: Images.Door,
    price: "Rs.20,000",
    url: "category/door",
  },
  {
    title: "Green Door",
    image: Images.Door,
    price: "Rs.20,000",
    url: "category/door",
  },
  {
    title: "Green Door",
    image: Images.Door,
    price: "Rs.20,000",
    url: "category/door",
  },
];
const ProductGrid = () => {
  return (
    <Carousel
      width="16.666667%"
      transformWidth="16.666667"
      carouselStyle = {{marginTop: 32,}}
      innerDivStyle={{  width: '95%'}}
      delay="1500"
      arrayLength = {ProductCardData.length}
      indicatorsStyle = {{display: 'none'}}
    >
      {ProductCardData.map((element) => (
        <CarouselItem>
          <ProductCard {...element} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default ProductGrid;
