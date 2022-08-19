import { createTheme } from "@mui/material/styles";
import Colors from "./res/colors";

const Theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    tertiary: {
      main: Colors.white,
    },
    green: {
      main: Colors.green,
    },
    green2: {
      main: Colors.green2,
    },
    biraRed: {
      main: Colors.biraRed,
    },
    biraOlive: {
      main: Colors.biraOlive,
    },
  },
});

export default Theme;
