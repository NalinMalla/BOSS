import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { Provider } from "react-redux";

import Theme from "./theme";
import Routes from "./routes";
import { store } from "./redux/store";

export default function App() {
  return (
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>BOSS</title>
      </head>
      <body style={{ background: "#F5F5F5" }}>
        <Provider store={store}>
          <ThemeProvider theme={Theme}>
            <Routes />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
