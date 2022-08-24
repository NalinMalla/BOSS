import * as React from "react";

import ProductList from "./productList";

import Colors from "../res/colors";

const OrderList = (props) => {
  let order = props.order;

  return (
    <div style={Styles.container}>
      {order !== undefined || order !== null ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              ...styles.container,
              width: "90%",
              alignItems: "flex-start",
              marginTop: 15,
            }}
          >
            <div style={{ ...styles.wrapper, justifyContent: "space-between" }}>
              <span
                style={{ color: Colors.primary, fontSize: 24, marginTop: 10 }}
              >
                Order ID : {order._id}
              </span>

              <span
                style={{ color: Colors.secondary, fontSize: 24, marginTop: 10 }}
              >
                Net Total : Rs. {order.netTotalPrice}
              </span>
            </div>
            <div style={{ ...styles.wrapper, justifyContent: "space-between" }}>
              <span
                style={{
                  color: Colors.secondary,
                  marginBottom: 15,
                  marginLeft: 2,
                }}
              >
                Placed on {order.createdAt.slice(0, 10)}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Status: {order.status}
              </span>
              <span
                style={{
                  color: Colors.secondary,
                  marginBottom: 15,
                }}
              >
                Includes Shipping Fee (Rs. {order.shippingFee})
              </span>
            </div>
            <ProductList products={order.products} counterDisabled={true} />
            <hr style={{ width: "100%" }} />
          </div>
        </div>
      ) : (
        <span
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 500,
            color: Colors.primary,
          }}
        >
          No Prior Order Found
        </span>
      )}
    </div>
  );
};

const Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  card: {
    marginBottom: 20,
  },
};

OrderList.defaultProps = {
  order: [],
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default OrderList;
