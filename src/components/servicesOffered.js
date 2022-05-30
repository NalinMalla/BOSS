import Colors from "../res/colors";
import Icons from "../res/icons";

export default function ServicesOffered() {
  return (
    <div style={Styles.root}>
      <div style={{ ...Styles.container, paddingLeft: 25, paddingRight: 25 }}>
        <img
          src={Icons.FastDelivery}
          style={{ height: 115, width: 120, paddingLeft: 35, paddingRight: 35 }}
          alt= "Fast Delivery"
        />
        <span style={Styles.heading}>QUICK DELIVERIES</span>
        <span style={Styles.description}>Safe and Easy Installation</span>
      </div>

      <div style={Styles.container}>
        <img
          src={Icons.Sketch}
          style={{ height: 95, width: 95, marginBottom: 10, marginTop: 10 }}
          alt= "Custom Design"
        />
        <span style={Styles.heading}>CUSTOM DESIGNS</span>
        <span style={Styles.description}>
          Free Interior Design Consultation
        </span>
      </div>

      <div style={{ ...Styles.container, paddingLeft: 25, paddingRight: 25 }}>
        <img
          src={Icons.Discount}
          style={{ height: 95, width: 95, marginBottom: 10, marginTop: 10 }}
          alt= "Discounted Prices"
        />

        <span style={Styles.heading}>DISCOUNTED PRICES</span>
        <span style={Styles.description}>Special Prices for Bulk Orders</span>
      </div>

      <div style={{ ...Styles.container, paddingLeft: 25, paddingRight: 25 }}>
        <img
          src={Icons.SecurePayment}
          style={{ height: 95, width: 95, marginBottom: 10, marginTop: 10 }}
          alt= "Encrypted Payments"
        />
        <span style={Styles.heading}>SECURE PAYMENTS</span>
        <span style={Styles.description}>Encrypted Payments</span>
      </div>
    </div>
  );
}

const Styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "95%",
    marginLeft: 60,
    marginRight: 60,
    marginTop: 60,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid rgba(0,0,0,1)`,
    padding: 15,
    borderRadius: 10,
  },
  heading: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    color: Colors.secondary,
    fontSize: 16,
    marginTop: 3,
  },
};
