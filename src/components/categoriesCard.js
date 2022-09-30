export default function Component(props) {
  function MouseOver(event) {
    event.target.style.boxShadow =
      event.target.className === "container" &&
      "4px 6px 4px rgba(0, 0, 0, 0.5)";
  }
  function MouseOut(event) {
    event.target.style.boxShadow = "none";
  }

  return (
    <div
      style={{
        ...Styles.root,
        background: `url(${props.image})`,
        backgroundSize: "cover",
        ...props.style,
      }}
      onMouseOver={MouseOver}
      onMouseOut={MouseOut}
      className={"container"}
      onClick={()=>{
        window.location= props.url;
      }}
    >
      <span style={Styles.title} className={"title"}>
        {props.title}
      </span>
    </div>
  );
}

const Styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 226,
    height: 290,
    borderRadius: 8,
    border: "1px solid #361709",
  },
  title: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    height: 42,
    borderRadius: "8px 8px 0px 0px",
    marginTop: -1,
    boxShadow: "none",
  },
};
