import * as React from "react";

import CategoriesCard from "./categoriesCard";

import Images from "../res/images";

const CategoriesCardData = [
  {
    title: "SOFA",
    image: Images.SofaBrown,
    url: "search/?categories/sofa",
  },
  {
    title: "CHAIR",
    image: Images.Chair,
    url: "search/?categories/chair",
  },
  {
    title: "BED",
    image: Images.Bed,
    url: "search/?categories/bed",
  },
  {
    title: "WARDROBE",
    image: Images.Wardrobe,
    url: "search/?categories/wardrobe",
  },
  {
    title: "DECORATION",
    image: Images.Decoration,
    url: "search/?categories/decoration",
  },
  {
    title: "TABLE",
    image: Images.Table,
    url: "search/?categories/table",
  },
  {
    title: "SHELF",
    image: Images.Shelf,
    url: "search/?categories/shelf",
  },
  {
    title: "WINDOW",
    image: Images.Window,
    url: "search/?categories/window",
  },
  {
    title: "DOOR",
    image: Images.Door,
    url: "search/?categories/door",
  },
  {
    title: "PREFABRICATION",
    image: Images.Prefab,
    url: "search/?categories/prefab",
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
