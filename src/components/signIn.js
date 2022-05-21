import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import Colors from "../res/colors";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color={"text.secondary"}
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://bira.com.np/" underline="hover">
        BIRA Builders & Suppliers PVT. LTD.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{ width: 90, height: 90, m: 1, bgcolor: Colors.biraRed, mt: 3 }}
      >
        <LockOpenIcon sx={{ width: 45, height: 45 }} />
      </Avatar>
      <Typography component="h1" variant="h4" sx={{ color: Colors.primary }}>
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3,color: Colors.primary, borderColor: Colors.primary }}>
     
      <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          color= 'primary'
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password" 
        />
  
        
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, height: "50px", backgroundColor:Colors.primary, fontSize: "16px" }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body1" sx={{color: Colors.primary}} underline="hover" color={Colors.primary}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body1" sx={{color: Colors.primary}} underline="hover" color={Colors.primary}>
              {"Don't have an account?"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 3 }} />
    </Box>
  );
}
