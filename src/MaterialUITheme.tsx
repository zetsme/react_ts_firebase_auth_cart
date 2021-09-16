import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Glory, sans-serif',
  },
});

export const MaterialUITheme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
