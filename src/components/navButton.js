import Colors from "../res/colors";

const NavButton = (prop) => {
  function MouseOver(event) {
    event.target.style.background = "white";
    event.target.style.color = Colors.primary;
  }
  function MouseOut(event) {
    event.target.style.background = Colors.primary;
    event.target.style.color = "white";
  }
  return (
    <button
      onMouseOver={MouseOver}
      onMouseOut={MouseOut}
      style={{
        height: 45,
        border: "0px",
        borderRadius: '0px 0px 5px 5px',
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: Colors.primary,
        fontSize: 15,
        color: "white",
        transition: "all .34s ease",
        WebkitTransition: "all .34s ease",
        MozTransition: "all .34s ease"
      }}
      onClick={() => {window.location = prop.url}}
    >
      {prop.value}
    </button>
  );
};

export default NavButton;
