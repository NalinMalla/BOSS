import Colors from "../res/colors";

export default function ServicesOffered(){
  return (
    <div style={Styles.root}>
      <div style={Styles.container}>
        <span style={Styles.heading}>DELIVERY & INSTALLATION</span>
        <span style={Styles.description}>Safe and Easy</span>
      </div>
      <div style={Styles.container}>
        <span style={Styles.heading}>CUSTOM DESIGNS</span>
        <span style={Styles.description}>Free Interior Design Consultation</span>
      </div>
      <div style={Styles.container}>
        <span style={Styles.heading}>DISCOUNTED PRICES</span>
        <span style={Styles.description}>Special Prices for Bulk Orders</span>
      </div>
    </div>
  );
}

const Styles = {
  root: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
    width:'90%',
    marginLeft:60,
    marginRight:60,
    marginTop:28,
  },
  container: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    color: Colors.secondary,
    fontSize: 16,
    marginTop: 3
  }
};
