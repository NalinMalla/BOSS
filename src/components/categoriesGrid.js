import * as React from "react";

import CategoriesCard from "./categoriesCard";

import Images from "../res/images";

const CategoriesCardData = [
  {
    title: "SOFA",
    image: Images.SofaBrown,
    url: "category/sofa",
  },
  {
    title: "CHAIR",
    image: Images.Chair,
    url: "category/chair",
  },
  {
    title: "BED",
    image: Images.Bed,
    url: "category/bed",
  },
  {
    title: "WARDROBE",
    image: Images.Wardrobe,
    url: "category/wardrobe",
  },
  {
    title: "DECORATION",
    image: Images.Decoration,
    url: "category/decoration",
  },
  {
    title: "TABLE",
    image: Images.Table,
    url: "category/table",
  },
  {
    title: "SHELF",
    image: Images.Shelf,
    url: "category/shelf",
  },
  {
    title: "WINDOW",
    image: Images.Window,
    url: "category/window",
  },
  {
    title: "DOOR",
    image: Images.Door,
    url: "category/door",
  },
  {
    title: "PREFABRICATION",
    image: Images.Prefab,
    url: "category/prefab",
  },
];
const CategoriesGrid = () => {
  return (
    <div style={Styles.container}>
      {CategoriesCardData.map((element) => (
        <CategoriesCard {...element} style={Styles.card} />
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

export default CategoriesGrid;
