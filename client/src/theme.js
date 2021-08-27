import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#42a5f5',
    },
    secondary: {
      main: '#0d47a1',
    },
  },
});

export default theme;