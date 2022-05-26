import { Link } from "@mui/material";

export default function CategoriesCard(props) {
  return (
    <Link href={props.url} underline="none">
      <div
        style={{
          ...Styles.root,
          background: `url(${props.image})`,
          backgroundSize: "cover",
          ...props.style,
        }}
      >
        <span style={Styles.title}>{props.title}</span>
      </div>
    </Link>
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
