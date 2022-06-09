import * as React from "react";
import Avatar from "@mui/material/Avatar";

import Header from "../components/header";
import NavBar from "../components/navBar";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import ProfileList from "../components/profileList";
import AddressForm from "../components/checkoutAddressForm";

import Colors from "../res/colors";
import Images from "../res/images";

const ProfileAddressBook = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
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
          <div
            style={{
              ...styles.container,
              background: "#FFF",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              width: "100%",
              borderRadius: 3,
              paddingBottom: 8,
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                m: 1,
                bgcolor: Colors.primary,
                mt: 2,
              }}
            >
              <img
                src={Images.Bed}
                alt="profile pic"
                style={{ width: 90, height: 90 }}
              />
            </Avatar>

            <span
              style={{ color: Colors.primary, fontSize: 22, fontWeight: 500 }}
            >
              Nalin Malla
            </span>
          </div>
          <ProfileList />
        </div>
        <div
          style={{
            ...styles.container,
            flex: 0.75,
            background: "#FFF",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 3,
            padding: 40
          }}
        >

          <AddressForm
            saveCheckboxStyle={{display: 'none'}}
            saveButtonStyle={{display: 'flex'}}
          />
        </div>
      </div>

      <div
        style={{
          ...styles.container,
          backgroundColor: Colors.primary,
          width: "100%",
          marginTop: 60,
        }}
      >
        <SiteMap />
        <Copyright />
      </div>

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        component={<SignIn />}
      />
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
