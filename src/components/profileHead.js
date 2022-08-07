import * as React from "react";
import Avatar from "@mui/material/Avatar";

import Colors from "../res/colors";

export default function ProfileHead() {
  const [firstName] = React.useState(localStorage.getItem("userFirstName"));
  const [middleName] = React.useState(localStorage.getItem("userMiddleName"));
  const [lastName] = React.useState(localStorage.getItem("userLastName"));

  const [profilePic] = React.useState(
    localStorage.getItem("userProfilePic") !== "undefined" &&
      localStorage.getItem("userProfilePic") !== undefined &&
      localStorage.getItem("userProfilePic") !== null
      ? localStorage.getItem("userProfilePic")
      : ""
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#FFF",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        width: "100%",
        borderRadius: 3,
        paddingBottom: 8,
      }}
    >
      {profilePic === "" ? (
        <Avatar
          sx={{
            width: 90,
            height: 90,
            m: 1,
            bgcolor: Colors.primary,
            mt: 2,
          }}
        ></Avatar>
      ) : (
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
            src={"http://localhost:5000/" + profilePic}
            style={{ width: 90, height: 90 }}
          />
        </Avatar>
      )}

      <span style={{ color: Colors.primary, fontSize: 22, fontWeight: 500 }}>
        {middleName == ""
          ? firstName + " " + lastName
          : firstName + " " + middleName + " " + lastName}
      </span>
    </div>
  );
}
