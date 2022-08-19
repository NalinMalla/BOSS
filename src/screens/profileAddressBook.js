import * as React from "react";

import ProfileList from "../components/profileList";
import ProfileHead from "../components/profileHead";
import AddressForm from "../components/checkoutAddressForm";

import Colors from "../res/colors";

const ProfileAddressBook = () => {
  return (
    <div id="root" style={styles.root}>
      <div
        style={{
          ...styles.wrapper,
          width: "92%",
          flex: 1,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div
          style={{
            ...styles.container,
            flex: 0.22,
          }}
        >
          <ProfileHead />
          <ProfileList />
        </div>
        <div
          style={{
            ...styles.container,
            flex: 0.75,
            background: "#FFF",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 3,
            padding: 40,
          }}
        >
          <AddressForm
            saveCheckboxStyle={{ display: "none" }}
            saveButtonStyle={{ display: "flex" }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
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

export default ProfileAddressBook;
