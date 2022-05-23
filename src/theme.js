import { createTheme} from '@mui/material/styles';
import Colors from "./res/colors";

const Theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    }
  },
});

export default Theme;