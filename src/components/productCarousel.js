import * as React from "react";

import ProductCard from "./productCard";
import Carousel, { CarouselItem } from "./carousel";

const ProductCarousel = (props) => {
  let products = props.products;
  return (
    <Carousel
      width="16.666667%"
      transformWidth="16.666667"
      carouselStyle={{ marginTop: 32 }}
      innerDivStyle={{ width: "95%" }}
      delay="2000"
      arrayLength="10"
      indicatorsStyle={{ visibility: "hidden" }}
    >
      {products[0] !== undefined ? (
        products.map((element) => (
          <CarouselItem>
            <ProductCard {...element} />
          </CarouselItem>
        ))
      ) : (
        <span
          style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 500,
            color: "#000",
          }}
        >
          Items Not Found
        </span>
      )}
    </Carousel>
  );
};

export default ProductCarousel;
