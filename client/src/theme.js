import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['"Comfortaa"', 'cursive'].join(',')
   },
  palette: {
    primary: {
      main: '#42a5f5',
    },
    secondary: {
      main: '#0d47a1',
    },
    background: {
      default: "#42a5f5",
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.2em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }
      }
    }
});

export default theme;