import { Link } from "@mui/material";

export default function ProductCard(props) {
  return (
    <div style={Styles.root}>
      <div
        style={{
          ...Styles.container,
          background: `url(${props.image})`,
          backgroundSize: "cover",
        }}
      ></div>
      <span style={Styles.title}>{props.title}</span>
      <span style={Styles.title}>{props.price}</span>
    </div>
  );
}

const Styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 210,
    height: 266,
    borderRadius: 8,
    border: "1px solid #361709",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  container: {
    
  },
  title: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFFFF",
    height: 40,
    borderRadius: "8px 8px 0px 0px",
  },
};
