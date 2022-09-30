import * as React from "react";
import Avatar from "@mui/material/Avatar";

import Colors from "../res/colors";

export default function ProfileHead(props) {
  // const [profilePic] = React.useState(
  //   localStorage.getItem("userProfilePic") !== "undefined" &&
  //     localStorage.getItem("userProfilePic") !== undefined &&
  //     localStorage.getItem("userProfilePic") !== null
  //     ? localStorage.getItem("userProfilePic")
  //     : ""
  // );

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
        display: props.display !== undefined ? "none" : "flex",
      }}
    >
      {localStorage.getItem("userProfilePic") === "undefined" ||
      localStorage.getItem("userProfilePic") === undefined ||
      localStorage.getItem("userProfilePic") === null ? (
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
            src={
              "http://localhost:5000/" + localStorage.getItem("userProfilePic")
            }
            style={{ width: 90, height: 90 }}
          />
        </Avatar>
      )}

      <span style={{ color: Colors.primary, fontSize: 22, fontWeight: 500 }}>
        {localStorage.getItem("userMiddleName") == ""
          ? localStorage.getItem("userFirstName") +
            " " +
            localStorage.getItem("userLastName")
          : localStorage.getItem("userFirstName") +
            " " +
            localStorage.getItem("userMiddleName") +
            " " +
            localStorage.getItem("userLastName")}
      </span>
    </div>
  );
}
