import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput() {
  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      searchText: data.get("search"),
    });
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "25vw",
        height: 32,
        minWidth: 250,
        marginTop: 4,
        marginRight: 3,
        border: `1px solid rgba(0,0,0, 0.5)`, 
        borderRadius: 50,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        name="search"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
