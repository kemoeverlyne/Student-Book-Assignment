import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Mulish, sans-serif', 
  },
  palette: {
    primary: {
      main: '#007bff', 
    },
    secondary: {
      main: '#6c757d', 
    },
  },
});

export default theme;
