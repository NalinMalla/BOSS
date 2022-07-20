import { ThemeProvider } from "@mui/material/styles";
import "./App.css";

import Theme from "./theme";
import Routes from "./routes";

export default function App() {
  return (
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>BOSS</title>
      </head>
      <body style={{background:'#F5F5F5'}}>
        <ThemeProvider theme={Theme}>
          <Routes />
        </ThemeProvider>
      </body>
    </html>
  );
}
