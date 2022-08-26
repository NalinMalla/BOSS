import * as React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function SearchInput() {
  const [searchText, setSearchText] = React.useState("");

  const handleSearchTextChange = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  return (
    <Box
      noValidate
      style={{ marginTop: 32, marginRight: 20 }}
      autoComplete="on"
    >
      <TextField
        id="input-with-icon-textfield"
        label="Search"
        value={searchText}
        size="small"
        style={{ borderRadius: 50, width: 350 }}
        onChange={handleSearchTextChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  window.location =
                    window.location.href.split("/")[3] === "search"
                      ? `/search/?${
                          window.location.href.split("?")[1].split(":")[0]
                        }:${searchText.split(0, 7)}`
                      : `/search/?all:${searchText.split(0, 7)}`;
                }}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Box>
  );
}
