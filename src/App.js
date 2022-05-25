import { ThemeProvider } from "@mui/material/styles";
import './App.css';

import Theme from "./theme";
import Routes from './routes';

export default function App() {
  return ( 
    <ThemeProvider theme={Theme}>
      <Routes/>
    </ThemeProvider>
  );
}
